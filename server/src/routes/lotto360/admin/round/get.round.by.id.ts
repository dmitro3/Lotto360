import { BigNumber } from "@ethersproject/bignumber";
import express, { Request, Response } from "express";

import { PoolAttrs } from "../../../../database/model/pool/interface.enum";
import { RoundAttrs } from "../../../../database/model/round/interface.enum";
import { TicketAttrs } from "../../../../database/model/ticket/interface.enum";
import { NotFoundError } from "../../../../errors/not-found-error";
import { requireAuth } from "../../../../middlewares/require-auth";
import { contract } from "../../../../provider/contracts";
import { getPlayersCount } from "../../../../utils/util";
import { responseMaker } from "../../../response.maker";
import { bnToNumber } from "../../../../utils/ethers";

const router = express.Router();

router.get("/api/round/:id", requireAuth, async (req: Request, res: Response) => {
    // send transaction to blockchain
    try {
        const roundId = req.params.id;
        if (!roundId) throw new NotFoundError("round id not found");

        const roundResult = await contract.getRoundById(roundId);
        const tickets: any[][] = await contract.getTicketsInRound(roundId);
        const poolsBn: BigNumber[] = await contract.getPoolsInRound(roundId);

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

export { router as getRoundByIdAdminRouter };
