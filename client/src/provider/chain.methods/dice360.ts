import Web3 from "web3";
import { convertRoll } from "../../interfaces/roll";
import { dice360Contract } from "../contracts";

export interface UserSetting {
    multiplier: number;
    minBet: number;
    maxBet: number;
}

export const dice360ChainMethods = {
    purchaseRoll: async (address: string, value: number, web3: Web3) => {
        try {
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

    userHistory: async (address: string, web3: Web3) => {
        try {
            return dice360Contract(web3).methods.GetMyHistory().call({ from: address });
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

    getRollById: async (id: string, address: string, web3: Web3) => {
        try {
            return dice360Contract(web3)
                .methods.UserGetRoleById(id)
                .call({ from: address });
        } catch (err) {
            console.error("Error checking ready rolls:", err);
            return null;
        }
    },
};

export const dice360AdminChainMethods = {
    injectFund: async (address: string, value: number, web3: Web3) => {
        try {
            return dice360Contract(web3)
                .methods.FundsInject()
                .send({
                    from: address,
                    value: Web3.utils.toWei(`${value}`, "ether"),
                });
        } catch (err) {
            console.error("Error injecting funds:", err);
            return null;
        }
    },

    setContractFee: async (address: string, value: number, web3: Web3) => {
        try {
            return dice360Contract(web3).methods.SetContractFee(value).send({
                from: address,
            });
        } catch (err) {
            console.error("Error setting house fee:", err);
            return null;
        }
    },

    setPrizeMultiplier: async (address: string, value: number, web3: Web3) => {
        try {
            return dice360Contract(web3).methods.SetPrizeMultiplier(value).send({
                from: address,
            });
        } catch (err) {
            console.error("Error setting multiplier:", err);
            return null;
        }
    },

    setMinRollAmount: async (address: string, value: number, web3: Web3) => {
        try {
            return dice360Contract(web3)
                .methods.SetMinRollAmount(Web3.utils.toWei(`${value}`, "ether"))
                .send({
                    from: address,
                });
        } catch (err) {
            console.error("Error setting min roll value:", err);
            return null;
        }
    },

    setMaxRollAmount: async (address: string, value: number, web3: Web3) => {
        try {
            return dice360Contract(web3)
                .methods.SetMaxRollAmount(Web3.utils.toWei(`${value}`, "ether"))
                .send({
                    from: address,
                });
        } catch (err) {
            console.error("Error setting max roll value:", err);
            return null;
        }
    },

    transferOwnership: async (address: string, newOwner: string, web3: Web3) => {
        try {
            return dice360Contract(web3).methods.transferOwnership(newOwner).send({
                from: address,
            });
        } catch (err) {
            console.error("Error transferring owner:", err);
            return null;
        }
    },

    getSettingForAdmin: async (address: string, web3: Web3) => {
        try {
            return dice360Contract(web3).methods.GetSettingForAdmin().call({
                from: address,
            });
        } catch (err) {
            console.error("Error transferring owner:", err);
            return null;
        }
    },

    getRolls: async (address: string, web3: Web3) => {
        try {
            const result: any[] = await dice360Contract(web3).methods.GetRolls().call({
                from: address,
            });

            return convertRoll(result);
        } catch (err) {
            console.error("Error getting rolls:", err);
            return null;
        }
    },

    getUserRolls: async (address: string, userAddress: string, web3: Web3) => {
        try {
            const result: any[] = await dice360Contract(web3)
                .methods.GetUserRolls(userAddress)
                .call({
                    from: address,
                });

            return convertRoll(result);
        } catch (err) {
            console.error("Error getting rolls:", err);
            return null;
        }
    },

    getRoleById: async (address: string, rollId: string, web3: Web3) => {
        try {
            const result: any[] = await dice360Contract(web3)
                .methods.GetRoleById(rollId)
                .call({
                    from: address,
                });

            return convertRoll([result]);
        } catch (err) {
            console.error("Error getting roll:", err);
            return null;
        }
    },
};
