import express, { Request, Response } from "express";

import { requireAuth } from "../../../../middlewares/require-auth";
import { responseMaker } from "../../../response.maker";
import { Payment } from "../../../../database/model/payment/payment";
import { BadRequestError } from "../../../../errors/bad-request-error";
import { ResponseMessageType } from "../../../../middlewares/error-handler";

const router = express.Router();

router.get(
    "/api/getuserpayments/:id",
    requireAuth,
    async (req: Request, res: Response) => {
        try {
            const address = req.params.id;
            if (!address)
                throw new BadRequestError("No address found", ResponseMessageType.ERROR);
            const payments = await Payment.find({ address });

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
    }
);

export { router as getUserPaymentsRouter };
