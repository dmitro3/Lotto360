import express, { Request, Response } from "express";
import { ethers } from "ethers";

import { RoundAttrs } from "../../../../database/model/round/interface.enum";
import { ResponseMessageType } from "../../../../middlewares/error-handler";
import { validateRequest } from "../../../../middlewares/validate-request";
import { updateRoundValidatorSchema } from "../../validation/schemas";
import { BadRequestError } from "../../../../errors/bad-request-error";
import { lotto360Contract, provider } from "../../../../provider/contracts";
import { requireAuth } from "../../../../middlewares/require-auth";
import { responseMaker } from "../../../response.maker";

const router = express.Router();

router.put(
    "/api/round",
    requireAuth,
    updateRoundValidatorSchema,
    validateRequest,
    async (req: Request, res: Response) => {
        // extract body
        const { endTime, bonusBnbAmount, pools }: RoundAttrs = req.body;

        // make pools array
        const poolsArray: number[] = [];
        pools?.forEach((pool, i) => (poolsArray[i] = pool.percentage));

        let transactionHash: string = "";

        // send transaction to blockchain
        try {
            const tx = await lotto360Contract.updateCurrentRound(
                endTime,
                ethers.utils.parseEther(`${bonusBnbAmount}`),
                poolsArray,
                {
                    gasLimit: 1000000,
                }
            );

            // get tx hash
            transactionHash = tx.hash;

            // get tx result
            const txResult = await provider.waitForTransaction(tx.hash);
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
            else throw err;
        }
    }
);

export { router as updateCurrentRoundRouter };