import { ethers } from "ethers";
import express, { Request, Response } from "express";
import { RoundAttrs } from "../../../database/model/round/interface.enum";
import { BadRequestError } from "../../../errors/bad-request-error";
import { ResponseMessageType } from "../../../middlewares/error-handler";
import { requireAuth } from "../../../middlewares/require-auth";
import { validateRequest } from "../../../middlewares/validate-request";
import { lotto360Contract, rinkebyProvider } from "../../../provider/contracts";
import { responseMaker } from "../../response.maker";
import { addRoundValidatorSchema } from "../../validation/schemas";

const router = express.Router();

router.post(
    "/api/round",
    requireAuth,
    addRoundValidatorSchema,
    validateRequest,
    async (req: Request, res: Response) => {
        // extract body
        const {
            endTime,
            ticketPrice,
            bonusBnbAmount,
            bnbAddedFromLastRound,
            pools,
        }: RoundAttrs = req.body;

        // make pools array
        const poolsArray: number[] = [];
        pools?.forEach((pool, i) => (poolsArray[i] = pool.percentage));

        let transactionHash: string = "";

        // send transaction to blockchain
        try {
            const tx = await lotto360Contract.startNewRound(
                endTime,
                ethers.utils.parseEther(`${ticketPrice}`),
                ethers.utils.parseEther(`${bonusBnbAmount}`),
                ethers.utils.parseEther(`${bnbAddedFromLastRound}`),
                poolsArray,
                {
                    gasLimit: 1000000,
                }
            );

            // get tx hash
            console.info("add round transaction hash:", tx.hash);
            transactionHash = tx.hash;

            // get tx result
            const txResult = await rinkebyProvider.waitForTransaction(tx.hash);
            if (!txResult.status) {
                throw new BadRequestError(
                    transactionHash,
                    ResponseMessageType.TRANSACTION
                );
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
                throw new BadRequestError(
                    transactionHash,
                    ResponseMessageType.TRANSACTION
                );
            else
                throw new BadRequestError("bad request", ResponseMessageType.TRANSACTION);
        }
    }
);

export { router as createRoundRouter };
