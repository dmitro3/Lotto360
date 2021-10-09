import Web3 from "web3";
import { GetRoundApiModel, PoolAttrs } from "../api/models/round.model";
import { bnbTokenAddress, lotto360ContractAddress } from "../config/config";
import { bnToNumber } from "../utilities/string.numbers.util";
import { bnbTokenContract, lotto360Contract } from "./contracts";

export const ChainMethods = {
    // * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    approveSpendBnbOnLottoContract: async (spenderAddress: string, web3: Web3) => {
        try {
            const result = await bnbTokenContract(web3)
                .methods.approve(
                    lotto360ContractAddress,
                    web3.utils.toWei("0.02", "ether")
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
            const amount = await bnbTokenContract(web3)
                .methods.allowance(bnbTokenAddress, spenderAddress)
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

            const tickets = await lotto360Contract(web3)
                .methods.getUserTicketsInCurrentRound()
                .call();

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
                if (num < 1000000 || num > 1999999) {
                    // todo return and show alert
                }
            });

            const roundResult = await lotto360Contract(web3)
                .methods.buyTickets(roundId, tickets)
                .send({ from: userAddress })
                .call();
            return roundResult;
        } catch (err) {
            console.error("Error buying tickets:", err);
            return null;
        }
    },
};
