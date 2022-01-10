import { BigNumber } from "@ethersproject/bignumber";
import express, { Request, Response } from "express";

import {
    PoolAttrs,
    PoolWinnersAttr,
} from "../../../../database/model/pool/interface.enum";
import {
    TicketAttrs,
    TicketStatus,
} from "../../../../database/model/ticket/interface.enum";
import { RoundAttrs } from "../../../../database/model/round/interface.enum";
import { NotFoundError } from "../../../../errors/not-found-error";
import { requireAuth } from "../../../../middlewares/require-auth";
import { Round } from "../../../../database/model/round/round";
import { lotto360Contract } from "../../../../provider/contracts";
import { getPlayersCount } from "../../../../utils/util";
import { responseMaker } from "../../../response.maker";
import { bnToNumber } from "../../../../utils/ethers";

const router = express.Router();

router.get("/api/fetchround/:id", requireAuth, async (req: Request, res: Response) => {
    // send transaction to blockchain
    try {
        const roundId = req.params.id;

        const roundResult = await lotto360Contract.getRoundById(roundId);
        const tickets: any[][] = await lotto360Contract.getTicketsInRound(roundId);
        const poolsBn: BigNumber[] = await lotto360Contract.getPoolsInRound(roundId);

        let pools: PoolAttrs[] = [];
        pools = poolsBn.map((bn, i) => {
            return { name: i, percentage: bn.toNumber() };
        });

        const ticketArray: TicketAttrs[] = [];
        if (tickets.length === 4) {
            const count = tickets[0].length;
            for (let i = 0; i < count; i++) {
                ticketArray.push({
                    cid: tickets[0][i].toNumber(),
                    number: tickets[1][i].toNumber(),
                    owner: tickets[2][i].toString(),
                    isClaimed: tickets[3][i],
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
        throw err;
    }
});

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

        return {
            match1: match1Array.map((t) => ({ ...t, ticketStatus: TicketStatus.Win })),
            match2: match2Array.map((t) => ({ ...t, ticketStatus: TicketStatus.Win })),
            match3: match3Array.map((t) => ({ ...t, ticketStatus: TicketStatus.Win })),
            match4: match4Array.map((t) => ({ ...t, ticketStatus: TicketStatus.Win })),
            match5: match5Array.map((t) => ({ ...t, ticketStatus: TicketStatus.Win })),
            match6: match6Array.map((t) => ({ ...t, ticketStatus: TicketStatus.Win })),
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
