import { ethers } from "ethers";
import express, { Request, Response } from "express";
import moment from "moment";
import { Withdraw } from "../../../database/model/withdraw/withdraw";
import { BadRequestError } from "../../../errors/bad-request-error";
import { ResponseMessageType } from "../../../middlewares/error-handler";
import { requireAuth } from "../../../middlewares/require-auth";
import { lotto360Contract, rinkebyProvider } from "../../../provider/contracts";
import { responseMaker } from "../../response.maker";

const router = express.Router();

router.post(
    "/api/withdraw",
    // requireAuth,
    async (req: Request, res: Response) => {
        try {
            const { recipient, amount } = req.body;
            if (!recipient || !amount)
                throw new BadRequestError(
                    "invalid body objects",
                    ResponseMessageType.ERROR
                );

            // transfer money to user account
            const tx = await lotto360Contract.payThePrize(
                recipient,
                ethers.utils.parseEther(`${amount}`),
                {
                    gasLimit: 1000000,
                }
            );

            // get tx hash
            const transactionHash = tx.hash;

            // get tx result
            const txResult = await rinkebyProvider.waitForTransaction(tx.hash);
            if (!txResult.status) {
                throw new BadRequestError(
                    transactionHash,
                    ResponseMessageType.TRANSACTION
                );
            }

            const withdraw = Withdraw.build({
                amount,
                recipient,
                time: moment.utc().toDate(),
            });
            await withdraw.save();

            res.status(200).send(
                responseMaker({
                    success: true,
                    result: withdraw,
                })
            );
        } catch (err: any) {
            console.info(err);
            throw new BadRequestError("bad request", ResponseMessageType.ERROR);
        }
    }
);

export { router as withdrawRouter };
