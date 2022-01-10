import { ethers } from "ethers";
import express, { Request, Response } from "express";

import { ResponseMessageType } from "../../../../middlewares/error-handler";
import { WITHDRAW_PHRASE } from "../../../../config/blockchain.configs";
import { BadRequestError } from "../../../../errors/bad-request-error";
import { lotto360Contract, provider } from "../../../../provider/contracts";
import { requireAuth } from "../../../../middlewares/require-auth";
import { responseMaker } from "../../../response.maker";

const router = express.Router();

router.post("/api/withdraw", requireAuth, async (req: Request, res: Response) => {
    try {
        const { recipient, amount, passphrase } = req.body;

        if (!recipient || !amount || passphrase !== WITHDRAW_PHRASE)
            throw new BadRequestError("invalid body objects", ResponseMessageType.ERROR);
        // transfer money to user account
        const tx = await lotto360Contract.transferToken(
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

        res.status(200).send(
            responseMaker({
                success: true,
                messages: [
                    {
                        message: transactionHash,
                        type: ResponseMessageType.TRANSACTION,
                    },
                ],
                result: { recipient, amount },
            })
        );
    } catch (err: any) {
        console.info(err);
        throw err;
    }
});

export { router as withdrawRouter };
