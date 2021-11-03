import express, { Request, Response } from "express";
import { RoundAttrs } from "../../../database/model/round/interface.enum";
import { Round } from "../../../database/model/round/round";
import { BadRequestError } from "../../../errors/bad-request-error";
import { ResponseMessageType } from "../../../middlewares/error-handler";
import { requireAuth } from "../../../middlewares/require-auth";
import { lotto360Contract } from "../../../provider/contracts";
import { bnToNumber } from "../../../utils/ethers";
import { responseMaker } from "../../response.maker";

const router = express.Router();

router.get(
    "/api/allrounds",
    // requireAuth,
    async (req: Request, res: Response) => {
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
                    const roundResult = lotto360Contract.getRoundById(i);
                    promiseArray.push(roundResult);
                }
                const values = await Promise.all(promiseArray);
                values.forEach((roundResult: any) => {
                    const round: RoundAttrs = convertChaindataToRound(
                        roundResult,
                        dbRounds
                    );
                    roundArray.push(round);
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
            throw new BadRequestError("bad request", ResponseMessageType.ERROR);
        }
    }
);

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
