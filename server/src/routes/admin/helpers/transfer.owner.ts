import express, { Request, Response } from "express";

import { lotto360Contract, rinkebyProvider } from "../../../provider/contracts";
import { ResponseMessageType } from "../../../middlewares/error-handler";
import { BadRequestError } from "../../../errors/bad-request-error";
import { NotFoundError } from "../../../errors/not-found-error";
import { responseMaker } from "../../response.maker";

const router = express.Router();

router.post(
    "/api/transferownership/:address",
    // requireAuth,
    async (req: Request, res: Response) => {
        const newOwnerAddress = req.params.address;
        if (!newOwnerAddress) throw new NotFoundError("no address specified");

        let transactionHash: string = "";

        // send transaction to blockchain
        try {
            const tx = await lotto360Contract.transferOwnership(newOwnerAddress, {
                gasLimit: 1000000,
            });

            // get tx hash
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

export { router as transferOwnerRouter };