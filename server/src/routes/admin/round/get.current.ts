import express, { Request, Response } from "express";
import { BigNumber } from "@ethersproject/bignumber";

import { TicketAttrs } from "../../../database/model/ticket/interface.enum";
import { RoundAttrs } from "../../../database/model/round/interface.enum";
import { PoolAttrs } from "../../../database/model/pool/interface.enum";
import { NotFoundError } from "../../../errors/not-found-error";
import { requireAuth } from "../../../middlewares/require-auth";
import { contract } from "../../../provider/contracts";
import { getPlayersCount } from "../../../utils/util";
import { responseMaker } from "../../response.maker";
import { bnToNumber } from "../../../utils/ethers";

const router = express.Router();

router.get("/api/round", requireAuth, async (req: Request, res: Response) => {
    // send transaction to blockchain
    try {
        const roundResult = await contract.getCurrentRound();
        const tickets: BigNumber[][] = await contract.getCurrentRoundTickets();
        const poolsBn: BigNumber[] = await contract.getCurrentRoundPools();

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
        };

        if (!roundResult || !roundResult.length)
            throw new NotFoundError("round not found");

        res.status(200).send(
            responseMaker({
                success: true,
                result: round,
            })
        );
    } catch (err: any) {
        throw err;
    }
});

export { router as getCurrentRoundRouter };
