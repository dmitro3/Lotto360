import { ethers } from "ethers";
import express, { Request, Response } from "express";
import moment from "moment";

import { ResponseMessageType } from "../../../middlewares/error-handler";
import { Withdraw } from "../../../database/model/withdraw/withdraw";
import { WITHDRAW_PHRASE } from "../../../config/blockchain.configs";
import { BadRequestError } from "../../../errors/bad-request-error";
import { contract, provider } from "../../../provider/contracts";
import { requireAuth } from "../../../middlewares/require-auth";
import { responseMaker } from "../../response.maker";

const router = express.Router();

router.post("/api/withdraw", requireAuth, async (req: Request, res: Response) => {
    try {
        const { recipient, amount, passphrase } = req.body;

        if (!recipient || !amount || passphrase !== WITHDRAW_PHRASE)
            throw new BadRequestError("invalid body objects", ResponseMessageType.ERROR);

        // transfer money to user account
        const tx = await contract.payThePrize(
            recipient,
            ethers.utils.parseEther(`${amount}`),
            {
                gasLimit: 1000000,
            }
        );

        // get tx hash
        const transactionHash = tx.hash;

        // get tx result
        const txResult = await provider.waitForTransaction(tx.hash);
        if (!txResult.status) {
            throw new BadRequestError(transactionHash, ResponseMessageType.TRANSACTION);
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
                messages: [
                    {
                        message: transactionHash,
                        type: ResponseMessageType.TRANSACTION,
                    },
                ],
                result: withdraw,
            })
        );
    } catch (err: any) {
        console.info(err);
        throw err;
    }
});

export { router as withdrawRouter };
