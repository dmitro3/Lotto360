import Web3 from "web3";
import { cloneDeep } from "lodash";
import { GetRoundApiModel } from "../api/models/round.model";

export interface ActionModel<T> {
    type: T;
    payload?: any;
}

export enum LottoActions {
    SET_WEB3,
    SET_ADDRESS,
    SET_CURRENT_ROUND,
    SET_BNB_PRICE,
}

export interface LottoState {
    currentRound?: GetRoundApiModel;
    bnbPrice: number;
    historyAmount: number;
    currentPrize: number;
    historyRound?: number;
    address?: string;
    web3?: Web3;
}

export const initialState: LottoState = {
    // todo remove this add 0
    currentPrize: 800,
    historyRound: 800,
    historyAmount: 1800,
    bnbPrice: 0,
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

        case LottoActions.SET_WEB3:
            newState.web3 = action.payload;
            return newState;

        case LottoActions.SET_CURRENT_ROUND:
            newState.currentRound = cloneDeep(action.payload);
            return newState;

        case LottoActions.SET_BNB_PRICE:
            newState.bnbPrice = action.payload;
            return newState;

        default:
            return newState;
    }
}
