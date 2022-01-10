import express, { Request, Response } from "express";

import { RoundAttrs } from "../../../../database/model/round/interface.enum";
import { requireAuth } from "../../../../middlewares/require-auth";
import { Round } from "../../../../database/model/round/round";
import { lotto360Contract } from "../../../../provider/contracts";
import { responseMaker } from "../../../response.maker";
import { bnToNumber } from "../../../../utils/ethers";

const router = express.Router();

router.get("/api/allrounds", requireAuth, async (req: Request, res: Response) => {
    // send transaction to blockchain
    try {
        let roundResult = await lotto360Contract.getCurrentRound();
        // @ts-ignore
        const dbRounds: any[] = await Round.find({}, { cid: 1, _id: 0 });

        const roundArray: RoundAttrs[] = [];
        const round: RoundAttrs = convertChaindataToRound(roundResult, dbRounds);
        roundArray.push(round);

        const currentRound = round.cid;
        const promiseArray: Promise<any>[] = [];
        if (currentRound > 1) {
            for (let i = currentRound - 1; i > 0; i--) {
                const roundRes = await lotto360Contract.getRoundById(i);
                promiseArray.push(roundRes);
            }
            const values = await Promise.all(promiseArray);
            values.forEach((r: any) => {
                const roundData: RoundAttrs = convertChaindataToRound(r, dbRounds);
                roundArray.push(roundData);
            });
        }

        res.status(200).send(
            responseMaker({
                success: true,
                result: roundArray,
            })
        );
    } catch (err: any) {
        console.info(err);
        throw err;
    }
});

export { router as getAllRoundsRouter };

// .................................................................................
const convertChaindataToRound = (roundResult: any, dbIds: any[]): RoundAttrs => {
    const inDb = dbIds.map((o) => o.cid).includes(roundResult.cid.toNumber());

    return {
        status: roundResult.status,
        cid: roundResult.cid.toNumber(),
        startTime: roundResult.startTime.toNumber(),
        endTime: roundResult.endTime.toNumber(),
        ticketPrice: bnToNumber(roundResult.ticketPrice),
        firstTicketId: roundResult.firstTicketId.toNumber(),
        firstTicketIdNextRound: roundResult.firstTicketIdNextRound.toNumber(),
        totalBnbAmount:
            bnToNumber(roundResult.totalBnbAmount) +
            bnToNumber(roundResult.bonusBnbAmount) +
            bnToNumber(roundResult.bnbAddedFromLastRound),
        bonusBnbAmount: bnToNumber(roundResult.bonusBnbAmount),
        bnbAddedFromLastRound: bnToNumber(roundResult.bnbAddedFromLastRound),
        finalNumber: roundResult.finalNumber.toNumber(),
        totalPlayers: 0,
        isInDb: inDb,
        totalTickets: 0,
    };
};
