import Web3 from "web3";
import { cloneDeep } from "lodash";
import { GetRoundApiModel } from "../api/models/round.model";

export interface ActionModel<T> {
    type: T;
    payload?: any;
}

export enum LottoActions {
    SET_ADDRESS,
    SET_BNB_PRICE,
    SET_CURRENT_ROUND,
    SET_NETWORK_ID,
    SET_WEB3,
}

export interface LottoState {
    ticketPrice: number;
    networkId: number;
    currentRound?: GetRoundApiModel;
    bnbPrice: number;
    historyAmount: number;
    currentPrize: number;
    historyRound?: number;
    address?: string;
    web3?: Web3;
}

export const initialState: LottoState = {
    ticketPrice: 0,
    bnbPrice: 0,
    currentPrize: 0,
    historyRound: 0,
    historyAmount: 0,
    networkId: 0,
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
            newState.networkId = action.payload;
            return newState;

        case LottoActions.SET_WEB3:
            newState.web3 = action.payload;
            return newState;

        default:
            return newState;
    }
}
