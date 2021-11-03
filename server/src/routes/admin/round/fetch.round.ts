import { BigNumber } from "@ethersproject/bignumber";
import express, { Request, Response } from "express";
import { PoolAttrs, PoolWinnersAttr } from "../../../database/model/pool/interface.enum";
import { RoundAttrs } from "../../../database/model/round/interface.enum";
import { Round } from "../../../database/model/round/round";
import { TicketAttrs, TicketStatus } from "../../../database/model/ticket/interface.enum";
import { BadRequestError } from "../../../errors/bad-request-error";
import { NotFoundError } from "../../../errors/not-found-error";
import { ResponseMessageType } from "../../../middlewares/error-handler";
import { requireAuth } from "../../../middlewares/require-auth";
import { lotto360Contract } from "../../../provider/contracts";
import { bnToNumber } from "../../../utils/ethers";
import { getPlayersCount } from "../../../utils/util";
import { responseMaker } from "../../response.maker";

const router = express.Router();

router.get(
    "/api/fetchround/:id",
    // requireAuth,
    async (req: Request, res: Response) => {
        // send transaction to blockchain
        try {
            const roundId = req.params.id;

            const roundResult = await lotto360Contract.getRoundById(roundId);
            const tickets: BigNumber[][] = await lotto360Contract.getTicketsInRound(
                roundId
            );
            const poolsBn: BigNumber[] = await lotto360Contract.getPoolsInRound(roundId);

            let pools: PoolAttrs[] = [];
            pools = poolsBn.map((bn, i) => {
                return { name: i, percentage: bn.toNumber() };
            });

            const ticketArray: TicketAttrs[] = [];
            if (tickets.length === 3) {
                const count = tickets[0].length;
                for (let i = 0; i < count; i++) {
                    ticketArray.push({
                        cid: tickets[0][i].toNumber(),
                        number: tickets[1][i].toNumber(),
                        owner: tickets[2][i].toString(),
                    });
                }
            }

            if (!roundResult || !roundResult.length)
                throw new NotFoundError("round not found");

            const winnerPools: PoolWinnersAttr | undefined = calculateWinningTicketCounts(
                roundResult.finalNumber.toNumber(),
                ticketArray
            );

            const round: RoundAttrs = {
                status: roundResult.status,
                cid: roundResult.cid.toNumber(),
                startTime: roundResult.startTime.toNumber(),
                endTime: roundResult.endTime.toNumber(),
                ticketPrice: bnToNumber(roundResult.ticketPrice),
                firstTicketId: roundResult.firstTicketId.toNumber(),
                firstTicketIdNextRound: roundResult.firstTicketIdNextRound.toNumber(),
                totalBnbAmount: bnToNumber(roundResult.totalBnbAmount),
                bonusBnbAmount: bnToNumber(roundResult.bonusBnbAmount),
                bnbAddedFromLastRound: bnToNumber(roundResult.bnbAddedFromLastRound),
                finalNumber: roundResult.finalNumber.toNumber(),
                pools: pools,
                tickets: ticketArray,
                totalPlayers: getPlayersCount(ticketArray),
                totalTickets: ticketArray.length,
                isInDb: true,
                winnersInPools: winnerPools,
            };
            console.info(round);
            const roundModel = Round.build(round);
            await roundModel.save();

            res.status(200).send(
                responseMaker({
                    success: true,
                    result: true,
                })
            );
        } catch (err: any) {
            console.info(err);
            throw new BadRequestError("bad request", ResponseMessageType.ERROR);
        }
    }
);

export { router as fetchRoundRouter };

// ..........................................................................................
function calculateWinningTicketCounts(
    finalNumber: number,
    tickets: TicketAttrs[] | undefined
): PoolWinnersAttr | undefined {
    if (!tickets || tickets.length === 0 || !finalNumber) return undefined;
    else {
        const winNumber = ticketNumToStr(finalNumber);
        let alreadyWon: TicketAttrs[] = [];

        const match6Array = tickets.filter((t) => ticketNumToStr(t.number) === winNumber);
        alreadyWon = [...match6Array];

        const match5Array = tickets.filter((t) =>
            winningCondition(t, winNumber, -1, alreadyWon)
        );
        alreadyWon = [...alreadyWon, ...match5Array];

        const match4Array = tickets.filter((t) =>
            winningCondition(t, winNumber, -2, alreadyWon)
        );
        alreadyWon = [...alreadyWon, ...match4Array];

        const match3Array = tickets.filter((t) =>
            winningCondition(t, winNumber, -3, alreadyWon)
        );
        alreadyWon = [...alreadyWon, ...match3Array];

        const match2Array = tickets.filter((t) =>
            winningCondition(t, winNumber, -4, alreadyWon)
        );
        alreadyWon = [...alreadyWon, ...match2Array];

        const match1Array = tickets.filter((t) =>
            winningCondition(t, winNumber, -5, alreadyWon)
        );

        const rest = {
            ticketStatus: TicketStatus.Win,
            prizeClaimed: false,
        };

        return {
            match1: match1Array.map((t) => ({ ...t, ...rest })),
            match2: match2Array.map((t) => ({ ...t, ...rest })),
            match3: match3Array.map((t) => ({ ...t, ...rest })),
            match4: match4Array.map((t) => ({ ...t, ...rest })),
            match5: match5Array.map((t) => ({ ...t, ...rest })),
            match6: match6Array.map((t) => ({ ...t, ...rest })),
        };
    }
}

const winningCondition = (
    ticket: TicketAttrs,
    winNumber: string,
    sliceNumber: number,
    alreadyWon: TicketAttrs[]
) =>
    ticketNumToStr(ticket.number).slice(0, sliceNumber) ===
        winNumber.slice(0, sliceNumber) && !alreadyWon.includes(ticket);

const ticketNumToStr = (num: number) => num.toString().substring(1);
