import Web3 from "web3";
import { dice360Contract } from "./contracts";

export interface UserSetting {
    multiplier: number;
    minBet: number;
    maxBet: number;
}

export const dice360ChainMethods = {
    purchaseRoll: async (address: string, value: number, web3: Web3) => {
        try {
            /**  return dice360Contract(web3)
                .methods.FundsInject()
                .send({
                    from: address,
                    value: Web3.utils.toWei(`${1}`, "ether"),
                });
                */
            return dice360Contract(web3)
                .methods.PurchaseRoll()
                .send({
                    from: address,
                    value: Web3.utils.toWei(`${value}`, "ether"),
                });
        } catch (err) {
            console.error("Error checking ready rolls:", err);
            return null;
        }
    },
    userReadyRoll: async (address: string, web3: Web3) => {
        try {
            return await dice360Contract(web3)
                .methods.GetReadyRoll()
                .call({ from: address });
        } catch (err) {
            console.error("Error checking ready rolls:", err);
            return null;
        }
    },
    userHistory: async (web3: Web3) => {
        try {
            const rolls = await dice360Contract(web3).methods.GetMyHistory().call();
            return rolls;
        } catch (err) {
            console.error("Error checking ready rolls:", err);
            return null;
        }
    },
    getSettingForUser: async (web3: Web3): Promise<UserSetting | null> => {
        try {
            const settings = await dice360Contract(web3)
                .methods.GetSettingForUser()
                .call();
            const result: UserSetting = {
                multiplier: parseInt(settings[0]),
                minBet: parseFloat(Web3.utils.fromWei(settings[1], "ether")),
                maxBet: parseFloat(Web3.utils.fromWei(settings[2], "ether")),
            };
            return result;
        } catch (err) {
            console.error("Error checking ready rolls:", err);
            return null;
        }
    },
};
