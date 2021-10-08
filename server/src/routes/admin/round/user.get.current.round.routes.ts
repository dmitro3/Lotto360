import { BigNumber } from "@ethersproject/bignumber";
import express, { Request, Response } from "express";
import { RoundAttrs } from "../../../database/model/round/interface.enum";
import { ResponseMessageType } from "../../../middlewares/error-handler";
import { PoolAttrs } from "../../../database/model/pool/interface.enum";
import { BadRequestError } from "../../../errors/bad-request-error";
import { NotFoundError } from "../../../errors/not-found-error";
import { lotto360Contract } from "../../../provider/contracts";
import { responseMaker } from "../../response.maker";
import { bnToNumber } from "../../../utils/ethers";

const router = express.Router();

router.get("/api/userround", async (req: Request, res: Response) => {
    // send transaction to blockchain
    try {
        const roundResult = await lotto360Contract.getCurrentRoundForUser();
        const tickets = await lotto360Contract.getUserTicketsInCurrentRound();
        const poolsBn: BigNumber[] =
            await lotto360Contract.getPoolsInCurrentRoundForUser();

        let pools: PoolAttrs[] = [];
        pools = poolsBn.map((bn, i) => {
            return { name: i, percentage: bn.toNumber() };
        });

        const round: RoundAttrs = {
            status: roundResult.status,
            cid: roundResult.cid.toNumber(),
            startTime: roundResult.startTime.toNumber(),
            endTime: roundResult.endTime.toNumber(),
            ticketPrice: bnToNumber(roundResult.ticketPrice),
            firstTicketId: roundResult.firstTicketId.toNumber(),
            firstTicketIdNextRound: roundResult.firstTicketIdNextRound.toNumber(),
            totalBnbAmount: bnToNumber(roundResult.totalBnbAmount),
            bonusBnbAmount: bnToNumber(roundResult.bonusBnbAmount),
            bnbAddedFromLastRound: bnToNumber(roundResult.bnbAddedFromLastRound),
            finalNumber: roundResult.finalNumber.toNumber(),
            pools: pools,
            tickets: tickets,
        };

        if (!roundResult || !roundResult.length)
            throw new NotFoundError("round not found");

        res.status(200).send(
            responseMaker({
                success: true,
                result: round,
            })
        );
    } catch (err: any) {
        console.error(err);
        throw new BadRequestError("bad request", ResponseMessageType.ERROR);
    }
});

export { router as userGetCurrentRoundRouter };
