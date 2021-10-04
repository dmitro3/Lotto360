import Web3 from "web3";
import { bnbTokenAddress, lotto360ContractAddress } from "../config/config";
import { bnbTokenContract } from "./contracts";

export const ChainMethods = {
    // * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    approveSpendBnbOnLottoContract: async (spenderAddress: string, web3: Web3) => {
        try {
            const result = await bnbTokenContract(web3)
                .methods.approve(
                    lotto360ContractAddress,
                    web3.utils.toWei("0.01", "ether")
                )
                .send({ from: spenderAddress });
            return result;
        } catch (err) {
            console.error("Error approving approve contract spend", err);
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
            console.error("Error check allowance", err);
            return null;
        }
    },
};
