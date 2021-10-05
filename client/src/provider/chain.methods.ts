import Web3 from "web3";
import { bnbTokenAddress, lotto360ContractAddress } from "../config/config";
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
    getCurrentRoundForUser: async (userAddress: string, web3: Web3) => {
        try {
            const roundResult = await lotto360Contract(web3)
                .methods.getCurrentRoundForUser()
                .call();
            return roundResult;
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
