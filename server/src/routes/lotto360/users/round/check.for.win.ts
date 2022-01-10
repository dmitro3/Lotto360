import express, { Request, Response } from "express";
import { ethers } from "ethers";

import { RoundWinBrief } from "../../../../database/model/round/interface.enum";
import { ResponseMessageType } from "../../../../middlewares/error-handler";
import { BadRequestError } from "../../../../errors/bad-request-error";
import { contract, provider } from "../../../../provider/contracts";
import { Round } from "../../../../database/model/round/round";
import { responseMaker } from "../../../response.maker";
import {
    TicketStatus,
    WinningTicketAttrs,
} from "../../../../database/model/ticket/interface.enum";
import { Payment } from "../../../../database/model/payment/payment";

const router = express.Router();

router.post("/api/user/checkwin/:id", async (req: Request, res: Response) => {
    try {
        const userAddress = req.params.id;
        if (!userAddress)
            throw new BadRequestError(
                "user address not found",
                ResponseMessageType.ERROR
            );

        // match filter
        const matchExpression = {
            $elemMatch: {
                owner: { $regex: new RegExp("^" + userAddress, "i") },
                ticketStatus: TicketStatus.Win,
                isClaimed: false,
            },
        };

        // query to get unclaimed prizes
        const rounds = await Round.find(
            {
                $or: [
                    { "winnersInPools.match1": matchExpression },
                    { "winnersInPools.match2": matchExpression },
                    { "winnersInPools.match3": matchExpression },
                    { "winnersInPools.match4": matchExpression },
                    { "winnersInPools.match5": matchExpression },
                    { "winnersInPools.match6": matchExpression },
                ],
            },
            { tickets: 0 }
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

        const briefs: RoundWinBrief[] = [];
        const roundIds: number[] = [];
        const ticketIds: number[] = [];
        let totalPay = 0;
        rounds.forEach(async (round) => {
            const {
                cid,
                totalBnbAmount,
                bonusBnbAmount,
                bnbAddedFromLastRound,
                finalNumber,
                winnersInPools,
                pools,
            } = round;

            if (!winnersInPools) return;
            const brief: RoundWinBrief = {
                roundId: cid,
                winningNumber: finalNumber,
            };
            const { match1, match2, match3, match4, match5, match6 } = winnersInPools;
            const totalPrice = totalBnbAmount + bonusBnbAmount + bnbAddedFromLastRound;

            if (match1 && match1.length) {
                const poolPrice =
                    (totalPrice * pools[0].percentage) / (100 * match1.length);
                brief.m1 = { price: poolPrice, tickets: [] };
                match1.forEach((ticket) => {
                    if (isWinnerAndNotClaimed(ticket, userAddress)) {
                        roundIds.push(cid);
                        ticketIds.push(ticket.cid);
                        brief.m1!.tickets.push(ticket.number);
                        ticket.isClaimed = true;
                        totalPay += poolPrice;
                    }
                });
            }
            if (match2 && match2.length) {
                const poolPrice =
                    (totalPrice * pools[1].percentage) / (100 * match2.length);
                brief.m2 = { price: poolPrice, tickets: [] };
                match2.forEach((ticket) => {
                    if (isWinnerAndNotClaimed(ticket, userAddress)) {
                        roundIds.push(cid);
                        ticketIds.push(ticket.cid);
                        brief.m2!.tickets.push(ticket.number);
                        ticket.isClaimed = true;
                        totalPay += poolPrice;
                    }
                });
            }
            if (match3 && match3.length) {
                const poolPrice =
                    (totalPrice * pools[2].percentage) / (100 * match3.length);
                brief.m3 = { price: poolPrice, tickets: [] };
                match3.forEach((ticket) => {
                    if (isWinnerAndNotClaimed(ticket, userAddress)) {
                        roundIds.push(cid);
                        ticketIds.push(ticket.cid);
                        brief.m3!.tickets.push(ticket.number);
                        ticket.isClaimed = true;
                        totalPay += poolPrice;
                    }
                });
            }
            if (match4 && match4.length) {
                const poolPrice =
                    (totalPrice * pools[3].percentage) / (100 * match4.length);
                brief.m4 = { price: poolPrice, tickets: [] };
                match4.forEach((ticket) => {
                    if (isWinnerAndNotClaimed(ticket, userAddress)) {
                        roundIds.push(cid);
                        ticketIds.push(ticket.cid);
                        brief.m4!.tickets.push(ticket.number);
                        ticket.isClaimed = true;
                        totalPay += poolPrice;
                    }
                });
            }
            if (match5 && match5.length) {
                const poolPrice =
                    (totalPrice * pools[4].percentage) / (100 * match5.length);
                brief.m5 = { price: poolPrice, tickets: [] };
                match5.forEach((ticket) => {
                    if (isWinnerAndNotClaimed(ticket, userAddress)) {
                        roundIds.push(cid);
                        ticketIds.push(ticket.cid);
                        brief.m5!.tickets.push(ticket.number);
                        ticket.isClaimed = true;
                        totalPay += poolPrice;
                    }
                });
            }
            if (match6 && match6.length) {
                const poolPrice =
                    (totalPrice * pools[5].percentage) / (100 * match6.length);
                brief.m6 = { price: poolPrice, tickets: [] };
                match6.forEach((ticket) => {
                    if (isWinnerAndNotClaimed(ticket, userAddress)) {
                        roundIds.push(cid);
                        ticketIds.push(ticket.cid);
                        brief.m6!.tickets.push(ticket.number);
                        ticket.isClaimed = true;
                        totalPay += poolPrice;
                    }
                });
            }
            briefs.push(brief);
        });

        // transfer money to user account
        const tx = await contract.claimPrize(
            roundIds,
            ticketIds,
            userAddress,
            ethers.utils.parseEther(`${totalPay}`),
            {
                gasLimit: 1000000,
            }
        );

        // get tx hash
        const transactionHash = tx.hash;

        // get tx result
        const txResult = await provider.waitForTransaction(tx.hash);
        if (!txResult.status) {
            throw new BadRequestError(transactionHash, ResponseMessageType.TRANSACTION);
        }

        const payment = Payment.build({
            address: userAddress,
            amount: totalPay,
            transaction: transactionHash,
        });
        payment.save();

        for (let round of rounds) {
            await round.save();
        }

        res.status(200).send(
            responseMaker({
                success: true,
                result: {
                    totalWin: totalPay,
                    briefs,
                },
            })
        );
    } catch (err: any) {
        console.error(err);
        throw new BadRequestError("bad request", ResponseMessageType.ERROR, err);
    }
});

export { router as checkForWinRouter };

// .................................................................................
const isWinnerAndNotClaimed = (ticket: WinningTicketAttrs, address: string) =>
    ticket.owner.toLowerCase() === address.toLowerCase() &&
    ticket.ticketStatus == TicketStatus.Win &&
    !ticket.isClaimed;
