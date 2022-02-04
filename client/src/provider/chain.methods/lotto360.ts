import { toast } from "react-toastify";
import Web3 from "web3";
import { GetRoundApiModel, PoolAttrs, TicketAttrs } from "../../api/models/round.model";
import { bnToNumber } from "../../utilities/string.numbers.util";
import { CustomToastWithLink } from "../../utilities/toastLink";
import { lotto360Contract } from "../contracts";

export const lotto360ChainMethods = {
    getMaxTicketsPerBuy: async (web3: Web3) => {
        try {
            return lotto360Contract(web3)
                .methods.getMaxNumberTicketsPerBuyOrClaim()
                .call();
        } catch (err) {
            console.error("Error check max tickets per buy:", err);
            return null;
        }
    },

    getUserBalance: async (address: string, web3: Web3) => {
        try {
            return await web3.eth.getBalance(address);
        } catch (err) {
            console.error("Error check user balance:", err);
            return null;
        }
    },

    getCurrentRoundForUser: async (address: string, web3: Web3) => {
        try {
            const roundResult = await lotto360Contract(web3)
                .methods.getCurrentRoundForUser()
                .call({ from: address });

            const ticketsResult = await lotto360Contract(web3)
                .methods.getUserTicketsInCurrentRound()
                .call({ from: address });

            let tickets: TicketAttrs[] = [];
            if (ticketsResult) {
                for (let i = 0; i < ticketsResult[0].length; i++) {
                    tickets[i] = {
                        cid: ticketsResult[0][i],
                        number: ticketsResult[1][i],
                        owner: ticketsResult[2][i],
                        isClaimed: ticketsResult[3][i],
                    };
                }
            }

            const poolsBn: any[] = await lotto360Contract(web3)
                .methods.getPoolsInCurrentRoundForUser()
                .call({ from: address });

            let pools: PoolAttrs[] = [];
            pools = poolsBn.map((bn, i) => {
                return { name: i, percentage: bn };
            });

            const round: GetRoundApiModel = {
                status: roundResult.status,
                cid: roundResult.cid,
                startTime: roundResult.startTime,
                endTime: roundResult.endTime,
                ticketPrice: bnToNumber(roundResult.ticketPrice),
                firstTicketId: roundResult.firstTicketId,
                firstTicketIdNextRound: roundResult.firstTicketIdNextRound,
                totalBnbAmount: bnToNumber(roundResult.totalBnbAmount),
                bonusBnbAmount: bnToNumber(roundResult.bonusBnbAmount),
                bnbAddedFromLastRound: bnToNumber(roundResult.bnbAddedFromLastRound),
                finalNumber: roundResult.finalNumber,
                pools: pools,
                tickets: tickets,
                totalPlayers: 0,
                totalTickets: 0,
            };

            if (!roundResult || !roundResult.length) return null;

            return round;
        } catch (err) {
            console.error("Error get current round:", err);
            return null;
        }
    },

    buyTickets: async (
        userAddress: string,
        roundId: number,
        tickets: number[],
        ticketPrice: number,
        web3: Web3
    ) => {
        try {
            tickets.forEach((num) => {
                if (num < 1000000 || num > 1999999) toast.error("Invalid ticket numbers");
            });
            const amount = tickets.length * ticketPrice;
            const result = await lotto360Contract(web3)
                .methods.buyTickets(roundId, tickets)
                .send({
                    from: userAddress,
                    value: Web3.utils.toWei(`${amount}`, "ether"),
                });
            if (result.status) {
                toast.success(
                    CustomToastWithLink(result.transactionHash, "transaction done")
                );
            }
            return result.status;
        } catch (err: any) {
            console.error(err);
            if (err.receipt && !err.receipt.status) {
                toast.error(
                    CustomToastWithLink(err.receipt.transactionHash, "transaction failed")
                );
            }
            return null;
        }
    },
};
