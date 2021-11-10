import express, { Request, Response } from "express";
import { BigNumber } from "ethers";

import { TicketAttrs } from "../../../database/model/ticket/interface.enum";
import { requireAuth } from "../../../middlewares/require-auth";
import { contract } from "../../../provider/contracts";
import { responseMaker } from "../../response.maker";

const router = express.Router();

router.get("/api/alltickets", requireAuth, async (req: Request, res: Response) => {
    // send transaction to blockchain
    try {
        const tickets: any[][] = await contract.getAllTickets();
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

        res.status(200).send(
            responseMaker({
                success: true,
                result: ticketArray,
            })
        );
    } catch (err: any) {
        console.info(err);
        throw err;
    }
});

export { router as getAllTicketsRouter };
