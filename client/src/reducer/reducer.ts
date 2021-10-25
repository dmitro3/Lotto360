import Web3 from "web3";
import { cloneDeep } from "lodash";
import { GetRoundApiModel } from "../api/models/round.model";
import { initialRound } from "../components/admin/rounds/reducer/round.list.reducer";

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
}

export interface LottoState {
    userBalance: number;
    showModal: boolean;
    ticketPrice: number;
    networkId: number;
    currentRound: GetRoundApiModel;
    bnbPrice: number;
    historyAmount: number;
    currentPrize: number;
    address?: string;
    web3?: Web3;
}

export const initialState: LottoState = {
    userBalance: 0,
    showModal: false,
    ticketPrice: 0,
    bnbPrice: 0,
    currentPrize: 0,
    historyAmount: 0,
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
            if (state.address === action.payload) return state;
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

        case LottoActions.SET_NETWORK_ID:
            if (state.networkId === action.payload) return state;
            newState.networkId = action.payload;
            return newState;

        case LottoActions.SET_SHOW_MODAL:
            newState.showModal = action.payload;
            return newState;

        case LottoActions.SET_USER_BALANCE:
            if (state.userBalance === action.payload) return state;
            newState.userBalance = action.payload;
            return newState;

        case LottoActions.SET_WEB3:
            if (state.web3 === action.payload) return state;
            newState.web3 = action.payload;
            return newState;

        default:
            return newState;
    }
}
