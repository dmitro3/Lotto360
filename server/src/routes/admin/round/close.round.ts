import express, { Request, Response } from "express";

import { ResponseMessageType } from "../../../middlewares/error-handler";
import { BadRequestError } from "../../../errors/bad-request-error";
import { contract, provider } from "../../../provider/contracts";
import { requireAuth } from "../../../middlewares/require-auth";
import { responseMaker } from "../../response.maker";

const router = express.Router();

router.get("/api/closeround", requireAuth, async (req: Request, res: Response) => {
    let transactionHash: string = "";

    // send transaction to blockchain
    try {
        // send transaction
        const tx = await contract.closeCurrentRound({
            gasLimit: 1000000,
        });

        // get tx hash
        transactionHash = tx.hash;

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
            })
        );
    } catch (err: any) {
        if (transactionHash)
            throw new BadRequestError(transactionHash, ResponseMessageType.TRANSACTION);
        else throw err;
    }
});

export { router as closeRoundRouter };
