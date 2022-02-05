import Web3 from "web3";
import { convertSpin } from "../../interfaces/spin";
import { fruitContract } from "../contracts";

export interface UserSetting {
    multiplier: number;
    minBet: number;
    maxBet: number;
}

export const fruitChainMethods = {
    purchaseSpin: async (address: string, value: number, web3: Web3) => {
        try {
            return fruitContract(web3)
                .methods.PurchaseSpin()
                .send({
                    from: address,
                    value: Web3.utils.toWei(`${value}`, "ether"),
                });
        } catch (err) {
            console.error("Error checking ready spins:", err);
            return null;
        }
    },

    userReadySpin: async (address: string, web3: Web3) => {
        try {
            return await fruitContract(web3)
                .methods.GetReadySpin()
                .call({ from: address });
        } catch (err) {
            console.error("Error checking ready spins:", err);
            return null;
        }
    },

    userHistory: async (address: string, web3: Web3) => {
        try {
            return fruitContract(web3).methods.GetMyHistory().call({ from: address });
        } catch (err) {
            console.error("Error checking ready spins:", err);
            return null;
        }
    },

    getSettingForUser: async (web3: Web3): Promise<UserSetting | null> => {
        try {
            const settings = await fruitContract(web3).methods.GetSettingForUser().call();
            const result: UserSetting = {
                multiplier: parseInt(settings[0]),
                minBet: parseFloat(Web3.utils.fromWei(settings[1], "ether")),
                maxBet: parseFloat(Web3.utils.fromWei(settings[2], "ether")),
            };
            return result;
        } catch (err) {
            console.error("Error checking ready spins:", err);
            return null;
        }
    },

    getSpinById: async (id: string, address: string, web3: Web3) => {
        try {
            return fruitContract(web3)
                .methods.UserGetSpinById(id)
                .call({ from: address });
        } catch (err) {
            console.error("Error checking ready spins:", err);
            return null;
        }
    },
};

export const fruitAdminChainMethods = {
    injectFund: async (address: string, value: number, web3: Web3) => {
        try {
            return fruitContract(web3)
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
            return fruitContract(web3).methods.SetContractFee(value).send({
                from: address,
            });
        } catch (err) {
            console.error("Error setting house fee:", err);
            return null;
        }
    },

    setPrizeMultiplier: async (address: string, value: number, web3: Web3) => {
        try {
            return fruitContract(web3).methods.SetPrizeMultiplier(value).send({
                from: address,
            });
        } catch (err) {
            console.error("Error setting multiplier:", err);
            return null;
        }
    },

    setMinSpinAmount: async (address: string, value: number, web3: Web3) => {
        try {
            return fruitContract(web3)
                .methods.SetMinSpinAmount(Web3.utils.toWei(`${value}`, "ether"))
                .send({
                    from: address,
                });
        } catch (err) {
            console.error("Error setting min spin value:", err);
            return null;
        }
    },

    setMaxSpinAmount: async (address: string, value: number, web3: Web3) => {
        try {
            return fruitContract(web3)
                .methods.SetMaxSpinAmount(Web3.utils.toWei(`${value}`, "ether"))
                .send({
                    from: address,
                });
        } catch (err) {
            console.error("Error setting max spin value:", err);
            return null;
        }
    },

    transferOwnership: async (address: string, newOwner: string, web3: Web3) => {
        try {
            return fruitContract(web3).methods.transferOwnership(newOwner).send({
                from: address,
            });
        } catch (err) {
            console.error("Error transferring owner:", err);
            return null;
        }
    },

    getSettingForAdmin: async (address: string, web3: Web3) => {
        try {
            return fruitContract(web3).methods.GetSettingForAdmin().call({
                from: address,
            });
        } catch (err) {
            console.error("Error transferring owner:", err);
            return null;
        }
    },

    getSpins: async (address: string, web3: Web3) => {
        try {
            const result: any[] = await fruitContract(web3).methods.GetSpins().call({
                from: address,
            });

            return convertSpin(result).reverse();
        } catch (err) {
            console.error("Error getting spins:", err);
            return null;
        }
    },

    getUserSpins: async (address: string, userAddress: string, web3: Web3) => {
        try {
            const result: any[] = await fruitContract(web3)
                .methods.GetUserSpins(userAddress)
                .call({
                    from: address,
                });

            return convertSpin(result).reverse();
        } catch (err) {
            console.error("Error getting spins:", err);
            return null;
        }
    },

    getSpinById: async (address: string, spinId: string, web3: Web3) => {
        try {
            const result: any[] = await fruitContract(web3)
                .methods.GetSpinById(spinId)
                .call({
                    from: address,
                });

            return convertSpin([result]);
        } catch (err) {
            console.error("Error getting spin:", err);
            return null;
        }
    },

    withdrawToken: async (amount: string, address: string, to: string, web3: Web3) => {
        try {
            return await fruitContract(web3)
                .methods.WithdrawToken(to, Web3.utils.toWei(amount, "ether"))
                .send({
                    from: address,
                });
        } catch (err) {
            console.error("Error widraw:", err);
            return null;
        }
    },
};
