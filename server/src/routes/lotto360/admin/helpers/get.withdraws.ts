import express, { Request, Response } from "express";

import { requireAuth } from "../../../../middlewares/require-auth";
import { contract } from "../../../../provider/contracts";
import { responseMaker } from "../../../response.maker";
import { bnToNumber } from "../../../../utils/ethers";

const router = express.Router();

interface Withdraws {
    id: number;
    address: string;
    amount: number;
    time: number;
}

router.get("/api/getwithdraws", requireAuth, async (req: Request, res: Response) => {
    try {
        const withdrawsModels: Withdraws[] = [];

        // get all withdraws
        const withdraws = await contract.getWithdraws();

        if (withdraws && withdraws.length) {
            for (let i = 0; i < withdraws[1].length; i++) {
                withdrawsModels.push({
                    id: withdraws[0][i].toNumber(),
                    amount: bnToNumber(withdraws[1][i]),
                    address: withdraws[2][i],
                    time: withdraws[3][i].toNumber(),
                });
            }
        }

        res.status(200).send(
            responseMaker({
                success: true,
                result: withdrawsModels,
            })
        );
    } catch (err: any) {
        console.info(err);
        throw err;
    }
});

export { router as getWithdrawsRouter };
