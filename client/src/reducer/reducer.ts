import Web3 from "web3";
import { cloneDeep } from "lodash";
import { GetRoundApiModel } from "../api/models/round.model";
import { initialRound } from "../components/admin/rounds/reducer/round.list.reducer";
import { maxTicketsEachBuy } from "../config/config";

export interface ActionModel<T> {
    type: T;
    payload?: any;
}

export enum LottoActions {
    SET_ADDRESS,
    SET_BNB_PRICE,
    SET_CURRENT_ROUND,
    SET_NETWORK_ID,
    SET_SHOW_MODAL,
    SET_WEB3,
    SET_USER_BALANCE,
    SET_MAX_TICKETS,
    SET_PROVIDER_THINGS,
    SET_ADMIN_NAME,
}

export interface LottoState {
    userBalance: number;
    showModal: boolean;
    ticketPrice: number;
    networkId: number;
    currentRound: GetRoundApiModel;
    bnbPrice: number;
    maxTicketsPerBuy: number;
    historyAmount: number;
    currentPrize: number;
    admin: string;
    address?: string;
    web3?: Web3;
}

export const initialState: LottoState = {
    admin: "",
    userBalance: 0,
    showModal: false,
    ticketPrice: 0,
    bnbPrice: 0,
    currentPrize: 0,
    historyAmount: 0,
    maxTicketsPerBuy: maxTicketsEachBuy,
    networkId: 0,
    currentRound: initialRound,
};

export default function lottoReducer(
    state: LottoState,
    action: ActionModel<LottoActions>
): LottoState {
    const newState = { ...state };

    switch (action.type) {
        case LottoActions.SET_ADDRESS:
            newState.address = action.payload;
            return newState;

        case LottoActions.SET_BNB_PRICE:
            if (state.bnbPrice === action.payload) return state;
            newState.bnbPrice = action.payload;
            return newState;

        case LottoActions.SET_CURRENT_ROUND:
            newState.currentRound = cloneDeep(action.payload);
            if (
                newState.currentRound &&
                newState.ticketPrice !== newState.currentRound?.ticketPrice
            ) {
                newState.ticketPrice = newState.currentRound.ticketPrice;
            }
            return newState;

        case LottoActions.SET_MAX_TICKETS:
            if (state.maxTicketsPerBuy === action.payload) return state;
            newState.maxTicketsPerBuy = action.payload;
            return newState;

        case LottoActions.SET_NETWORK_ID:
            if (state.networkId === action.payload) return state;
            newState.networkId = action.payload;
            return newState;

        case LottoActions.SET_SHOW_MODAL:
            newState.showModal = action.payload;
            return newState;

        case LottoActions.SET_USER_BALANCE:
            newState.userBalance = action.payload;
            return newState;

        case LottoActions.SET_WEB3:
            if (state.web3 === action.payload) return state;
            newState.web3 = action.payload;
            return newState;

        case LottoActions.SET_ADMIN_NAME:
            newState.admin = action.payload;
            return newState;

        case LottoActions.SET_PROVIDER_THINGS:
            newState.web3 = action.payload.web3;
            newState.address = action.payload.account;
            newState.networkId = action.payload.networkId;
            return newState;

        default:
            return newState;
    }
}
