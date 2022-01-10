import express, { Request, Response } from "express";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";

import { LOTTO360_CONTRACT_ADDRESS } from "../../../../config/blockchain.configs";
import { NotFoundError } from "../../../../errors/not-found-error";
import { requireAuth } from "../../../../middlewares/require-auth";
import { lotto360Contract, provider } from "../../../../provider/contracts";
import { Round } from "../../../../database/model/round/round";
import { responseMaker } from "../../../response.maker";
import { bnToNumber } from "../../../../utils/ethers";

const router = express.Router();

router.get("/api/getbalancestats", requireAuth, async (req: Request, res: Response) => {
    try {
        // get contract balance
        const contractBalanceBn: BigNumber = await provider.getBalance(
            LOTTO360_CONTRACT_ADDRESS
        );
        const contractBalance = parseFloat(ethers.utils.formatEther(contractBalanceBn));

        // get bnb in current round
        const roundResult = await lotto360Contract.getCurrentRound();
        if (!roundResult || !roundResult.length)
            throw new NotFoundError("Current round not found");

        const currentRoundBalance =
            bnToNumber(roundResult.bnbAddedFromLastRound) +
            bnToNumber(roundResult.bonusBnbAmount) +
            bnToNumber(roundResult.totalBnbAmount);

        // get sum of winning pool
        const rounds = await Round.find({}, { tickets: 0 });

        let treasuryBalance = 0;
        let winnersBalance = 0;
        let totalWithdraws = 0;

        if (rounds && rounds.length) {
            rounds.forEach((r) => {
                const totalAsset =
                    r.totalBnbAmount + r.bonusBnbAmount + r.bnbAddedFromLastRound;
                treasuryBalance += (r.pools[6].percentage * totalAsset) / 100;

                if (!r.winnersInPools) return;

                if (r.winnersInPools.match1?.length)
                    winnersBalance += (r.pools[0].percentage * totalAsset) / 100;
                if (r.winnersInPools.match2?.length)
                    winnersBalance += (r.pools[1].percentage * totalAsset) / 100;
                if (r.winnersInPools.match3?.length)
                    winnersBalance += (r.pools[2].percentage * totalAsset) / 100;
                if (r.winnersInPools.match4?.length)
                    winnersBalance += (r.pools[3].percentage * totalAsset) / 100;
                if (r.winnersInPools.match5?.length)
                    winnersBalance += (r.pools[4].percentage * totalAsset) / 100;
                if (r.winnersInPools.match6?.length)
                    winnersBalance += (r.pools[5].percentage * totalAsset) / 100;
            });
        }

        // get all withdraws
        const withdraws = await lotto360Contract.getWithdraws();

        if (withdraws && withdraws.length) {
            for (let i = 0; i < withdraws[1].length; i++) {
                totalWithdraws += bnToNumber(withdraws[1][i]);
            }
        }

        res.status(200).send(
            responseMaker({
                success: true,
                result: {
                    contractBalance,
                    currentRoundBalance,
                    treasuryBalance,
                    winnersBalance,
                    totalWithdraws,
                },
            })
        );
    } catch (err: any) {
        console.info(err);
        throw err;
    }
});

export { router as getBalanceStatsRouter };
