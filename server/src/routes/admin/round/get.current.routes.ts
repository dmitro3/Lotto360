import { BigNumber } from "@ethersproject/bignumber";
import express, { Request, Response } from "express";
import { PoolAttrs } from "../../../database/model/pool/interface.enum";
import { RoundAttrs } from "../../../database/model/round/interface.enum";
import { BadRequestError } from "../../../errors/bad-request-error";
import { NotFoundError } from "../../../errors/not-found-error";
import { ResponseMessageType } from "../../../middlewares/error-handler";
import { requireAuth } from "../../../middlewares/require-auth";
import { lotto360Contract } from "../../../provider/contracts";
import { bnToNumber } from "../../../utils/ethers";
import { responseMaker } from "../../response.maker";

const router = express.Router();

router.get(
    "/api/round",
    // requireAuth,
    async (req: Request, res: Response) => {
        // send transaction to blockchain
        try {
            const result = await lotto360Contract.getCurrentRound({
                gasLimit: 1000000,
            });
            const tickets = await lotto360Contract.getCurrentRoundTickets({
                gasLimit: 1000000,
            });
            const poolsBn: BigNumber[] = await lotto360Contract.getCurrentRoundPools({
                gasLimit: 1000000,
            });

            const pools: PoolAttrs[] = poolsBn.map((bn, i) => {
                return { name: i, percentage: bn.toNumber() };
            });

            const round: RoundAttrs = {
                status: result.status,
                cid: result.cid.toNumber(),
                startTime: result.startTime.toNumber(),
                endTime: result.endTime.toNumber(),
                ticketPrice: bnToNumber(result.ticketPrice),
                firstTicketId: result.firstTicketId.toNumber(),
                firstTicketIdNextRound: result.firstTicketIdNextRound.toNumber(),
                totalBnbAmount: bnToNumber(result.totalBnbAmount),
                bonusBnbAmount: bnToNumber(result.bonusBnbAmount),
                bnbAddedFromLastRound: bnToNumber(result.bnbAddedFromLastRound),
                finalNumber: result.finalNumber.toNumber(),
                pools: pools,
            };

            if (!result || !result.length) throw new NotFoundError("round not found");

            res.status(200).send(
                responseMaker({
                    success: true,
                    result: round,
                })
            );
        } catch (err: any) {
            throw new BadRequestError("bad request", ResponseMessageType.ERROR);
        }
    }
);

export { router as getCurrentRoundRouter };
