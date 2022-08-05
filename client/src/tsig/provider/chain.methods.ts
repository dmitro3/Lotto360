import { toast } from "react-toastify";
import Web3 from "web3";
import { signalContract } from "../config/config";
import { asciiToHex } from "../utils/string";

export const chainMethods = {
    changeOwner: async (address: string, newOwner: string, web3: Web3) => {
        try {
            return signalContract(web3).methods.TransferOwnership(newOwner).send({
                from: address,
            });
        } catch (err) {
            console.error("Error transfer ownership:", err);
        }
    },

    setSubscriptionFee: async (address: string, fee: string, web3: Web3) => {
        try {
            if (Number(fee))
                return signalContract(web3)
                    .methods.SetSubscriptionFee(Web3.utils.toWei(fee))
                    .send({
                        from: address,
                    });
            else toast.warning("Invalid fee");
        } catch (err) {
            console.error("Error transfer ownership:", err);
        }
    },

    setReferrerShare: async (address: string, share: number, web3: Web3) => {
        try {
            return signalContract(web3).methods.SetReferrerShare(share).send({
                from: address,
            });
        } catch (err) {
            console.error("Error transfer ownership:", err);
        }
    },

    setPrizeAmount: async (address: string, amount: string, web3: Web3) => {
        try {
            return signalContract(web3)
                .methods.ChangePrizeAmount(Web3.utils.toWei(amount))
                .send({
                    from: address,
                });
        } catch (err) {
            console.error("Error set prize amount:", err);
        }
    },

    transferBNB: async (address: string, reciever: string, bnb: string, web3: Web3) => {
        try {
            return signalContract(web3)
                .methods.TransferBNB(reciever, Web3.utils.toWei(bnb))
                .send({
                    from: address,
                });
        } catch (err) {
            console.error("Error transfer ownership:", err);
        }
    },

    getUserBalance: async (address: string, web3: Web3) => {
        try {
            return await web3.eth.getBalance(address);
        } catch (err) {
            console.error("Error check user balance:", err);
            return 0;
        }
    },

    getUsers: async (address: string, web3: Web3): Promise<any> => {
        try {
            return signalContract(web3).methods.GetUsers().call({
                from: address,
            });
        } catch (err) {
            console.error("Error check get users:", err);
        }
    },

    isAdmin: async (address: string, web3: Web3): Promise<boolean> => {
        try {
            return signalContract(web3).methods.IsAdmin().call({
                from: address,
            });
        } catch (err) {
            console.error("Error check isAdmin:", err);
            return false;
        }
    },

    purchaseMembership: async (
        address: string,
        telegramId: string,
        referrer: string,
        registerFee: string,
        web3: Web3
    ): Promise<any> => {
        try {
            if (referrer)
                return signalContract(web3)
                    .methods.RefRegister(asciiToHex(telegramId), referrer)
                    .send({
                        from: address,
                        value: registerFee,
                    });
            return signalContract(web3).methods.Register(asciiToHex(telegramId)).send({
                from: address,
                value: registerFee,
            });
        } catch (err) {
            console.error("Error purchasing membership:", err);
        }
    },

    getCurrentPrize: async (address: string, web3: Web3) => {
        try {
            return signalContract(web3).methods.currentPrize().call({ from: address });
        } catch (err) {
            console.error("Error current prize:", err);
            return 0;
        }
    },

    getWinners: async (address: string, web3: Web3) => {
        try {
            return signalContract(web3).methods.GetWinners().call({ from: address });
        } catch (err) {
            console.error("Error getting winners:", err);
            return 0;
        }
    },

    getUserLastLuckParticipation: async (address: string, web3: Web3) => {
        try {
            return signalContract(web3)
                .methods.UserLuckLastParticipate()
                .call({ from: address });
        } catch (err) {
            console.error("Error last participation:", err);
            return 0;
        }
    },

    iFeelLucky: async (address: string, web3: Web3) => {
        try {
            return signalContract(web3).methods.IFeelLucky().send({ from: address });
        } catch (err) {
            console.error("Error last participation:", err);
            return false;
        }
    },

    getSubscriptionFee: async (address: string, web3: Web3) => {
        try {
            return signalContract(web3).methods.subscriptionFee().call({ from: address });
        } catch (err) {
            console.error("Error subscription fee:", err);
            return 0;
        }
    },

    getTotalUsers: async (address: string, web3: Web3) => {
        try {
            return signalContract(web3).methods.totalUsers().call({ from: address });
        } catch (err) {
            console.error("Error total users:", err);
            return 0;
        }
    },

    getTotalReferred: async (address: string, web3: Web3) => {
        try {
            return signalContract(web3).methods.totalRef().call({ from: address });
        } catch (err) {
            console.error("Error total referred:", err);
            return 0;
        }
    },

    getReferrerShare: async (address: string, web3: Web3) => {
        try {
            return signalContract(web3).methods.referrerShare().call({ from: address });
        } catch (err) {
            console.error("Error referrer share:", err);
            return 0;
        }
    },

    getMySubscription: async (address: string, web3: Web3) => {
        try {
            return signalContract(web3)
                .methods.GetMyInformation()
                .call({ from: address });
        } catch (err) {
            console.error("Error total subscription:", err);
            return 0;
        }
    },

    getMyTotalReferredUsers: async (address: string, web3: Web3) => {
        try {
            return signalContract(web3)
                .methods.GetMyTotalReferredUsers()
                .call({ from: address });
        } catch (err) {
            console.error("Error my total referred user:", err);
            return 0;
        }
    },
};
