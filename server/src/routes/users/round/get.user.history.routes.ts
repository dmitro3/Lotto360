import express, { Request, Response } from "express";

import { RoundStatus } from "../../../database/model/round/interface.enum";
import { ResponseMessageType } from "../../../middlewares/error-handler";
import { BadRequestError } from "../../../errors/bad-request-error";
import { Round } from "../../../database/model/round/round";
import { responseMaker } from "../../response.maker";

const router = express.Router();

router.post("/api/user/checkhistory/:id", async (req: Request, res: Response) => {
    try {
        const userAddress = req.params.id;
        if (!userAddress)
            throw new BadRequestError(
                "user address not found",
                ResponseMessageType.ERROR
            );

        // query to get unclaimed prizes
        const rounds = await Round.find(
            {
                status: RoundStatus.Close,
                tickets: {
                    $elemMatch: {
                        owner: { $regex: new RegExp("^" + userAddress, "i") },
                    },
                },
            },
            {
                _id: 0,
                __v: 0,
                ticketPrice: 0,
                firstTicketId: 0,
                firstTicketIdNextRound: 0,
                totalBnbAmount: 0,
                bonusBnbAmount: 0,
                bnbAddedFromLastRound: 0,
                status: 0,
                startTime: 0,
                totalPlayers: 0,
                totalTickets: 0,
                pools: 0,
            }
        );

        // early return if not found
        if (!rounds || !rounds.length) {
            res.status(200).send(
                responseMaker({
                    success: true,
                    result: null,
                })
            );
            return;
        }

        const poolTypesName = [
            "match1",
            "match2",
            "match3",
            "match4",
            "match5",
            "match6",
        ] as const;

        rounds.forEach((round) => {
            if (!round.tickets) return;
            round.tickets = round.tickets.filter(
                (ticket) => ticket.owner.toLowerCase() === userAddress.toLowerCase()
            );
            poolTypesName.forEach((name) => {
                if (round.winnersInPools) {
                    round.winnersInPools[name] = round.winnersInPools[name]?.filter(
                        (ticket) =>
                            ticket.owner.toLowerCase() === userAddress.toLowerCase()
                    );
                }
            });
        });

        res.status(200).send(
            responseMaker({
                success: true,
                result: rounds,
            })
        );
    } catch (err: any) {
        console.error(err);
        throw new BadRequestError("bad request", ResponseMessageType.ERROR, err);
    }
});

export { router as checkUserHistoryRouter };
