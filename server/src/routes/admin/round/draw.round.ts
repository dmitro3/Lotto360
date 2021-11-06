import express, { Request, Response } from "express";
import { lotto360Contract, rinkebyProvider } from "../../../provider/contracts";
import { ResponseMessageType } from "../../../middlewares/error-handler";
import { BadRequestError } from "../../../errors/bad-request-error";
import { responseMaker } from "../../response.maker";
import { generateSeed } from "../../../utils/util";
import { requireAuth } from "../../../middlewares/require-auth";

const router = express.Router();

router.get("/api/finishround", requireAuth, async (req: Request, res: Response) => {
    let transactionHash: string = "";

    // send transaction to blockchain
    try {
        const random = generateSeed();

        // send transaction
        const tx = await lotto360Contract.closeRoundAndPickWinningNumber(random, {
            gasLimit: 1000000,
        });

        // get tx hash
        console.info("claim winning number transaction hash:", tx.hash);
        transactionHash = tx.hash;

        // get tx result
        const txResult = await rinkebyProvider.waitForTransaction(tx.hash);
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
        else throw new BadRequestError("bad request", ResponseMessageType.TRANSACTION);
    }
});

export { router as drawRoundRouter };
