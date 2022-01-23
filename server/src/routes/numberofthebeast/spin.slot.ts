import { ethers } from "ethers";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { ResponseMessageType } from "../../middlewares/error-handler";
import { validateRequest } from "../../middlewares/validate-request";
import { nnumberOfTheBeastContract, provider } from "../../provider/contracts";
import { generateSeed } from "../../utils/util";
import { responseMaker } from "../response.maker";

const router = express.Router();

router.post(
    "/api/spinslot",
    [
        body("spinId")
            .isInt({ gt: 0 })
            .not()
            .isEmpty()
            .withMessage("please enter spin id"),
        body("address").isString().not().isEmpty().withMessage("please enter address"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        // extract body
        const { spinId, address } = req.body;
        let transactionHash: string = "";

        // send transaction to blockchain
        try {
            const tx = await nnumberOfTheBeastContract.SpinSlot(
                ethers.BigNumber.from(generateSeed()),
                ethers.BigNumber.from(spinId),
                address,
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
                    result: txResult,
                })
            );
        } catch (err: any) {
            if (transactionHash)
                throw new BadRequestError(
                    transactionHash,
                    ResponseMessageType.TRANSACTION
                );
            else throw new BadRequestError("bad request", ResponseMessageType.ERROR, err);
        }
    }
);

export { router as spinSlotRouter };
