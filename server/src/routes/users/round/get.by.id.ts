import express, { Request, Response } from "express";

import { PoolWinnersAttr } from "../../../database/model/pool/interface.enum";
import { TicketAttrs } from "../../../database/model/ticket/interface.enum";
import { validateRequest } from "../../../middlewares/validate-request";
import { NotFoundError } from "../../../errors/not-found-error";
import { Round } from "../../../database/model/round/round";
import { getRoundSchema } from "../../validation/schemas";
import { responseMaker } from "../../response.maker";

const router = express.Router();

router.post(
    "/api/user/round",
    getRoundSchema,
    validateRequest,
    async (req: Request, res: Response) => {
        // send transaction to blockchain
        try {
            const { roundId, address } = req.body;
            const round = await Round.findOne({ cid: roundId });

            if (!round) throw new NotFoundError("round not found");

            round.tickets = round.tickets?.filter(
                (t: TicketAttrs) => t.owner.toLowerCase() === address.toLowerCase()
            );

            round.winnersInPools = generateSensoredWinningPool(round.winnersInPools);

            res.status(200).send(
                responseMaker({
                    success: true,
                    result: round,
                })
            );
        } catch (err: any) {
            throw err;
        }
    }
);

export { router as getRoundByIdForUserRouter };

// .................................................................................
const generateSensoredWinningPool = (
    winnerPools: PoolWinnersAttr | undefined
): PoolWinnersAttr => {
    const match1 = winnerPools?.match1?.map((w) => ({
        number: 0,
        owner: "0",
        cid: 0,
        prizeClaimed: false,
        ticketStatus: 0,
    }));
    const match2 = winnerPools?.match2?.map((w) => ({
        number: 0,
        owner: "0",
        cid: 0,
        prizeClaimed: false,
        ticketStatus: 0,
    }));
    const match3 = winnerPools?.match3?.map((w) => ({
        number: 0,
        owner: "0",
        cid: 0,
        prizeClaimed: false,
        ticketStatus: 0,
    }));
    const match4 = winnerPools?.match4?.map((w) => ({
        number: 0,
        owner: "0",
        cid: 0,
        prizeClaimed: false,
        ticketStatus: 0,
    }));
    const match5 = winnerPools?.match5?.map((w) => ({
        number: 0,
        owner: "0",
        cid: 0,
        prizeClaimed: false,
        ticketStatus: 0,
    }));
    const match6 = winnerPools?.match6?.map((w) => ({
        number: 0,
        owner: "0",
        cid: 0,
        prizeClaimed: false,
        ticketStatus: 0,
    }));

    return { match1, match2, match3, match4, match5, match6 };
};
