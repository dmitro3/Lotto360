import express, { Request, Response } from "express";
import { requireAuth } from "../../../middlewares/require-auth";
import { validateRequest } from "../../../middlewares/validate-request";
import { addRoundValidatorSchema } from "../../validation/schemas";

const router = express.Router();

router.post(
    "/api/round",
    // requireAuth,
    addRoundValidatorSchema,
    validateRequest,
    async (req: Request, res: Response) => {
        const { endTime, ticketPrice, bonusBnbAmount, bnbAddedFromLastRound, pools } =
            req.body;
        console.info(pools);
        res.status(201).send({ jj: 900 });
    }
);

export { router as createRoundRouter };
