import moment from "moment";
import Web3 from "web3";
import { hexToAscii } from "../utils/string";

export interface ActionModel<T> {
    type: T;
    payload?: any;
}

export interface SubscriptionModel {
    id: number;
    telegramId: string;
    wallet: string;
    payment: number;
    date: string;
}

export interface WinnerModel {
    id: number;
    wallet: string;
    prize: number;
    date: string;
}

export enum ReducerActions {
    SET_ADDRESS,
    SET_BNB_PRICE,
    SET_CURRENT_PRIZE,
    SET_IS_ADMIN,
    SET_NETWORK_ID,
    SET_PROVIDER_PROPS,
    SET_REFERRER_SHARE,
    SET_SUBSCRIPTION_FEE,
    SET_TOTAL_REFERRED,
    SET_TOTAL_USERS,
    SET_USER_BALANCE,
    SET_USER_SUBSCRIPTIONS,
    SET_WEB3,
}

export const initialState: StateModel = {
    bnbPrice: 0,
    isAdmin: false,
    currentPrize: "0",
    referrerShare: 0,
    subscriptionFee: "0",
    totalReferred: "0",
    totalUsers: 0,
    userBalance: 0,
    userSubscription: [],
};

export interface StateModel {
    address?: string;
    bnbPrice: number;
    currentPrize: string;
    isAdmin: boolean;
    networkId?: number;
    referrerShare: number;
    subscriptionFee: string;
    totalReferred: string;
    totalUsers: number;
    userBalance: number;
    userSubscription: SubscriptionModel[];
    web3?: Web3;
}

export default function mainReducer(
    state: StateModel,
    action: ActionModel<ReducerActions>
): StateModel {
    const newState = { ...state };

    switch (action.type) {
        case ReducerActions.SET_ADDRESS:
            newState.address = action.payload;
            return newState;

        case ReducerActions.SET_BNB_PRICE:
            if (state.bnbPrice === action.payload) return state;
            newState.bnbPrice = action.payload;
            return newState;

        case ReducerActions.SET_CURRENT_PRIZE:
            if (state.currentPrize === action.payload) return state;
            newState.currentPrize = action.payload;
            return newState;

        case ReducerActions.SET_IS_ADMIN:
            newState.isAdmin = action.payload;
            return newState;

        case ReducerActions.SET_NETWORK_ID:
            if (state.networkId === action.payload) return state;
            newState.networkId = action.payload;
            return newState;

        case ReducerActions.SET_PROVIDER_PROPS:
            newState.web3 = action.payload.web3;
            newState.address = action.payload.account;
            newState.networkId = action.payload.networkId;
            return newState;

        case ReducerActions.SET_REFERRER_SHARE:
            if (state.referrerShare === action.payload) return state;
            newState.referrerShare = action.payload;
            return newState;
        case ReducerActions.SET_SUBSCRIPTION_FEE:
            if (state.subscriptionFee === action.payload) return state;
            newState.subscriptionFee = action.payload;
            return newState;

        case ReducerActions.SET_TOTAL_REFERRED:
            if (state.totalReferred === action.payload) return state;
            newState.totalReferred = action.payload;
            return newState;

        case ReducerActions.SET_TOTAL_USERS:
            if (state.totalUsers === action.payload) return state;
            newState.totalUsers = action.payload;
            return newState;

        case ReducerActions.SET_USER_BALANCE:
            newState.userBalance = action.payload;
            return newState;

        case ReducerActions.SET_USER_SUBSCRIPTIONS:
            newState.userSubscription = [...action.payload];
            return newState;

        case ReducerActions.SET_WEB3:
            if (state.web3 === action.payload) return state;
            newState.web3 = action.payload;
            return newState;

        default:
            return newState;
    }
}

export const chainResultToSubscriptionModel = (res: any[]) => {
    const userSubscription: SubscriptionModel[] = [];
    res.forEach((r, i) =>
        userSubscription.push({
            id: i + 1,
            date: moment(Number(r["date"]) * 1000).toLocaleString(),
            telegramId: hexToAscii(r["telegramId"]),
            wallet: r["wallet"],
            payment: Number(Web3.utils.fromWei(r["payment"])),
        })
    );
    return userSubscription;
};

export const chainResultToWinnerModel = (res: any[]) => {
    const winners: WinnerModel[] = [];
    res.forEach((r, i) =>
        winners.push({
            id: i + 1,
            date: moment(Number(r["date"]) * 1000).toLocaleString(),
            wallet: r["wallet"],
            prize: Number(Web3.utils.fromWei(r["prize"])),
        })
    );
    return winners;
};
