import express, { Request, Response } from "express";

import { requireAuth } from "../../../middlewares/require-auth";
import { responseMaker } from "../../response.maker";
import { Payment } from "../../../database/model/payment/payment";

const router = express.Router();

router.get("/api/getpayments", requireAuth, async (req: Request, res: Response) => {
    try {
        const payments = await Payment.find();

        res.status(200).send(
            responseMaker({
                success: true,
                result: payments,
            })
        );
    } catch (err: any) {
        console.info(err);
        throw err;
    }
});

export { router as getPaymentsRouter };
