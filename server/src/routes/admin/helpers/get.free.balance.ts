import express, { Request, Response } from "express";
import { ResponseMessageType } from "../../../middlewares/error-handler";
import { BadRequestError } from "../../../errors/bad-request-error";
import { requireAuth } from "../../../middlewares/require-auth";
import { Round } from "../../../database/model/round/round";
import { responseMaker } from "../../response.maker";
import { bnbTokenContract } from "../../../provider/contracts";
import { lotto360Address } from "../../../settings/blockchain.settings";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import { Withdraw } from "../../../database/model/withdraw/withdraw";

const router = express.Router();

router.get(
    "/api/getfreebalance",
    // requireAuth,
    async (req: Request, res: Response) => {
        try {
            const contractBalanceBn: BigNumber = await bnbTokenContract.balanceOf(
                lotto360Address
            );
            const contractBalance = parseFloat(
                ethers.utils.formatEther(contractBalanceBn)
            );

            const rounds = await Round.find();
            let treasuryBalance = 0;
            if (rounds && rounds.length) {
                rounds.forEach((r) => {
                    const treasuryPool = r.pools[r.pools.length - 1];
                    const totalAsset =
                        r.totalBnbAmount + r.bonusBnbAmount + r.bnbAddedFromLastRound;
                    treasuryBalance += (treasuryPool.percentage * totalAsset) / 100;
                });
            }

            const withdraws = await Withdraw.find();
            if (withdraws && withdraws.length) {
                withdraws.forEach((w) => {
                    treasuryBalance -= parseFloat(w.amount);
                });
            }

            res.status(200).send(
                responseMaker({
                    success: true,
                    result: { contractBalance, treasuryBalance },
                })
            );
        } catch (err: any) {
            console.info(err);
            throw new BadRequestError("bad request", ResponseMessageType.ERROR);
        }
    }
);

export { router as getFreeBalanceRouter };

// ....................................................................................
