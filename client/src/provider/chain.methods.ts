import Web3 from "web3";
import {
    GetRoundApiModel,
    PoolAttrs,
    TicketAttrs,
    TicketStatus,
} from "../api/models/round.model";
import { bnbTokenContract, lotto360Contract } from "./contracts";
import { bnToNumber } from "../utilities/string.numbers.util";
import { lotto360ContractAddress } from "../config/config";
import { toast } from "react-toastify";
import { CustomToastWithLink } from "../utilities/toastLink";

export const ChainMethods = {
    // * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    approveSpendBnbOnLottoContract: async (
        spenderAddress: string,
        amount: number,
        web3: Web3
    ) => {
        try {
            const result = await bnbTokenContract(web3)
                .methods.approve(
                    lotto360ContractAddress,
                    web3.utils.toWei(`${amount}`, "ether")
                )
                .send({ from: spenderAddress });
            return result;
        } catch (err) {
            console.error("Error approving approve contract spend:", err);
            return null;
        }
    },
    // * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    checkAllowance: async (spenderAddress: string, web3: Web3) => {
        try {
            // allowance(owner, spender)
            const amount = await bnbTokenContract(web3)
                .methods.allowance(spenderAddress, lotto360ContractAddress)
                .call();
            return amount;
        } catch (err) {
            console.error("Error check allowance:", err);
            return null;
        }
    },
    // * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    getCurrentRoundForUser: async (web3: Web3) => {
        try {
            const roundResult = await lotto360Contract(web3)
                .methods.getCurrentRoundForUser()
                .call();

            const ticketsResult: [][] = await lotto360Contract(web3)
                .methods.getUserTicketsInCurrentRound()
                .call();
            console.info(ticketsResult);
            let tickets: TicketAttrs[] = [];
            if (ticketsResult.length === 3) {
                for (let i = 0; i < ticketsResult[0].length; i++) {
                    tickets[i] = {
                        cid: ticketsResult[0][i],
                        number: ticketsResult[1][i],
                        owner: ticketsResult[2][i],
                        ticketStatus: TicketStatus.Unknown,
                        prizeClaimed: false,
                    };
                }
            }

            const poolsBn: any[] = await lotto360Contract(web3)
                .methods.getPoolsInCurrentRoundForUser()
                .call();

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
            };

            if (!roundResult || !roundResult.length) return null;

            return round;
        } catch (err) {
            console.error("Error get current round:", err);
            return null;
        }
    },
    // * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    buyTickets: async (
        userAddress: string,
        roundId: number,
        tickets: number[],
        web3: Web3
    ) => {
        try {
            tickets.forEach((num) => {
                if (num < 1000000 || num > 1999999) toast.error("Invalid ticket numbers");
            });

            const result = await lotto360Contract(web3)
                .methods.buyTickets(roundId, tickets)
                .send({ from: userAddress });
            if (result.status) {
                toast.success(
                    CustomToastWithLink(result.transactionHash, "transaction done")
                );
            }
            return result.status;
        } catch (err: any) {
            if (err.receipt && !err.receipt.status) {
                toast.error(
                    CustomToastWithLink(err.receipt.transactionHash, "transaction failed")
                );
            }
            return null;
        }
    },
};
