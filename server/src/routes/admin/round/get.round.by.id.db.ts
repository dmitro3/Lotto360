import express, { Request, Response } from "express";

import { Round } from "../../../database/model/round/round";
import { BadRequestError } from "../../../errors/bad-request-error";
import { NotFoundError } from "../../../errors/not-found-error";
import { ResponseMessageType } from "../../../middlewares/error-handler";
import { requireAuth } from "../../../middlewares/require-auth";
import { responseMaker } from "../../response.maker";

const router = express.Router();

router.get("/api/rounddb/:id", requireAuth, async (req: Request, res: Response) => {
    // send transaction to blockchain
    try {
        const roundId = parseInt(req.params.id);
        if (!roundId) throw new NotFoundError("round id not found");

        const round = await Round.findOne({ cid: roundId });

        if (!round) throw new NotFoundError("round not found");

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

export { router as getRoundByIdAdminFromDbRouter };
