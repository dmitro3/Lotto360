import { Dispatch, SetStateAction } from "react";
import Web3 from "web3";
import { signalContractAddress } from "../config/config";
import { chainMethods } from "../provider/chain.methods";
import {
    chainResultToSubscriptionModel,
    chainResultToWinnerModel,
    SubscriptionModel,
    WinnerModel,
} from "../reducer/reducer";

export const initialAdmin = (
    address: string,
    setAccounts: Dispatch<SetStateAction<SubscriptionModel[]>>,
    setBalance: Dispatch<SetStateAction<string>>,
    setRefs: Dispatch<SetStateAction<string>>,
    setWinners: Dispatch<SetStateAction<WinnerModel[]>>,
    setUsers: Dispatch<SetStateAction<string>>,
    web3: Web3
) => {
    chainMethods
        .getTotalReferred(address, web3)
        .then((res) => setRefs(res))
        .catch((err) => console.error("get total ref", err));

    chainMethods
        .getTotalUsers(address, web3)
        .then((res) => setUsers(res))
        .catch((err) => console.error("get total users", err));

    chainMethods
        .getUsers(address, web3)
        .then((res) => setAccounts(chainResultToSubscriptionModel(res)))
        .catch((err) => console.error("get total subscription", err));

    chainMethods
        .getWinners(address, web3)
        .then((res) => setWinners(chainResultToWinnerModel(res)))
        .catch((err) => console.error("get total winners", err));

    web3.eth
        .getBalance(signalContractAddress)
        .then((res) => setBalance(Web3.utils.fromWei(res)))
        .catch((err) => console.error("get balance", err));
};
