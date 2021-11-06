import { BigNumber } from "ethers";
import express, { Request, Response } from "express";
import { TicketAttrs } from "../../../database/model/ticket/interface.enum";
import { BadRequestError } from "../../../errors/bad-request-error";
import { ResponseMessageType } from "../../../middlewares/error-handler";
import { requireAuth } from "../../../middlewares/require-auth";
import { lotto360Contract } from "../../../provider/contracts";
import { responseMaker } from "../../response.maker";

const router = express.Router();

router.get("/api/alltickets", requireAuth, async (req: Request, res: Response) => {
    // send transaction to blockchain
    try {
        const tickets: BigNumber[][] = await lotto360Contract.getAllTickets();
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
