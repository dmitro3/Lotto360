import express, { Request, Response } from "express";

import { ResponseMessageType } from "../../../../middlewares/error-handler";
import { BadRequestError } from "../../../../errors/bad-request-error";
import { contract, provider } from "../../../../provider/contracts";
import { NotFoundError } from "../../../../errors/not-found-error";
import { requireAuth } from "../../../../middlewares/require-auth";
import { responseMaker } from "../../../response.maker";

const router = express.Router();

router.post(
    "/api/transferownership/:address",
    requireAuth,
    async (req: Request, res: Response) => {
        const newOwnerAddress = req.params.address;
        if (!newOwnerAddress) throw new NotFoundError("no address specified");

        let transactionHash: string = "";

        // send transaction to blockchain
        try {
            const tx = await contract.transferOwnership(newOwnerAddress, {
                gasLimit: 1000000,
            });

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
            else
                throw new BadRequestError("bad request", ResponseMessageType.TRANSACTION);
        }
    }
);

export { router as transferOwnerRouter };
