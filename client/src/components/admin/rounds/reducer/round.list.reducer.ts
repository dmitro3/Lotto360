import { AxiosResponse } from "axios";

import ApiResponseResult, { ListResult } from "../../../../api/models/response.model";
import {
    GetRoundApiModel,
    GetRoundListViewModel,
} from "../../../../api/models/round.model";
import { PageSize } from "../../../../config/config";
import { ActionModel } from "../../../../reducer/reducer";
import SortColumn from "../../../models/sort.column";

interface RoundListState {
    searchQuery: string;
    currentPage: number;
    pageSize: number;
    sortColumn: SortColumn;
    isLoading: boolean;
    rounds: GetRoundApiModel[];
    totalCount: number;
}

export const roundListInitialState: RoundListState = {
    pageSize: PageSize.SMALL,
    searchQuery: "",
    currentPage: 1,
    sortColumn: new SortColumn("id", "asc"),
    isLoading: false,
    rounds: [],
    totalCount: 0,
};

export enum RoundListAction {
    RENDER_ROUND_LIST,
    TOGGLE_LOADING,
    UPDATE_SEARCH,
    UPDATE_PAGESIZE,
    UPDATE_SORT,
    UPDATE_PAGE,
}

export default function roundListReducer(
    state: RoundListState,
    action: ActionModel<RoundListAction>
): RoundListState {
    const newState = { ...state };

    switch (action.type) {
        case RoundListAction.RENDER_ROUND_LIST:
            const response: AxiosResponse<
                ApiResponseResult<ListResult<GetRoundListViewModel>>
            > = action.payload;
            const { currentPage, pageSize } = newState;

            if (!response) return newState;

            if (!response.data.result) {
                newState.rounds = [];
                newState.totalCount = 0;
            } else if (
                response &&
                response.data.success &&
                response.data.result.items.rounds
            ) {
                const { items, totalCount } = response.data.result;
                newState.rounds = items.rounds;
                newState.totalCount = totalCount;
                if ((currentPage - 1) * pageSize > totalCount) {
                    newState.currentPage = 1;
                }
            }
            return newState;

        case RoundListAction.TOGGLE_LOADING:
            newState.isLoading = action.payload;
            return newState;

        case RoundListAction.UPDATE_PAGE:
            newState.currentPage = action.payload;
            return newState;

        case RoundListAction.UPDATE_PAGESIZE:
            newState.pageSize = action.payload;
            return newState;

        case RoundListAction.UPDATE_SEARCH:
            newState.searchQuery = action.payload;
            return newState;

        case RoundListAction.UPDATE_SORT:
            newState.sortColumn = action.payload;
            return newState;

        default:
            return newState;
    }
}
