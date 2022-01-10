import express, { Request, Response } from "express";

import {
    PoolAttrs,
    PoolWinnersAttr,
} from "../../../../database/model/pool/interface.enum";
import { RoundStatus } from "../../../../database/model/round/interface.enum";
import { NotFoundError } from "../../../../errors/not-found-error";
import { requireAuth } from "../../../../middlewares/require-auth";
import { Round } from "../../../../database/model/round/round";
import { responseMaker } from "../../../response.maker";

const router = express.Router();

router.get(
    "/api/calculateremainingbnb",
    requireAuth,
    async (req: Request, res: Response) => {
        try {
            // get last round
            const roundResult = await Round.findOne(
                { status: RoundStatus.Claimable },
                { tickets: 0 }
            )
                .sort({ cid: -1 })
                .limit(1);

            if (!roundResult) throw new NotFoundError("round not found");

            const {
                bnbAddedFromLastRound,
                bonusBnbAmount,
                totalBnbAmount,
                pools,
                winnersInPools,
            } = roundResult;

            const totalTokens = bnbAddedFromLastRound + bonusBnbAmount + totalBnbAmount;
            const remainingBnbFromRound: number = calculateRemainingBnb(
                totalTokens,
                pools,
                winnersInPools
            );

            res.status(200).send(
                responseMaker({
                    success: true,
                    result: remainingBnbFromRound,
                })
            );
        } catch (err: any) {
            throw err;
        }
    }
);

export { router as getRemainingBnbRouter };

// ....................................................................................
const calculateRemainingBnb = (
    totalTokens: number,
    pools: PoolAttrs[] | undefined,
    winnersInPools: PoolWinnersAttr | undefined
) => {
    if (!winnersInPools || !pools) return 0;
    const poolBnbArray = pools.map((p) => (p.percentage * totalTokens) / 100);

    let bnbRemain = 0;
    if (!winnersInPools.match1?.length) bnbRemain += poolBnbArray[0];
    if (!winnersInPools.match2?.length) bnbRemain += poolBnbArray[1];
    if (!winnersInPools.match3?.length) bnbRemain += poolBnbArray[2];
    if (!winnersInPools.match4?.length) bnbRemain += poolBnbArray[3];
    if (!winnersInPools.match5?.length) bnbRemain += poolBnbArray[4];
    if (!winnersInPools.match6?.length) bnbRemain += poolBnbArray[5];

    return bnbRemain;
};
