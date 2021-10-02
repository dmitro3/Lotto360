import Web3 from "web3";

export interface ActionModel<T> {
    type: T;
    payload?: any;
}

export enum LottoActions {
    SET_WEB3,
    SET_ADDRESS,
}

export interface LottoState {
    bnbPrice: number;
    historyAmount: number;
    currentPrize: number;
    address?: string;
    web3?: Web3;
}

export const initialState: LottoState = {
    // todo remove this add 0
    currentPrize: 800,
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

        default:
            return newState;
    }
}
