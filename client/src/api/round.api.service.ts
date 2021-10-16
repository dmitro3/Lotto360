import { AxiosResponse } from "axios";
import { baseUrl } from "../config/config";

import { httpService } from "./api.service";
import ApiResponseResult, { ListResult } from "./models/response.model";
import { GetRoundApiModel, GetRoundListViewModel } from "./models/round.model";

export const RoundApiService = {
    getRoundsPaginated(
        currentPage: number,
        pageSize: number,
        sortBy: string,
        order: string = "asc",
        keyword: string = ""
    ): Promise<AxiosResponse<ApiResponseResult<ListResult<GetRoundListViewModel>>>> {
        return httpService.get(`${baseUrl}/user/list`, {
            params: {
                skip: (currentPage - 1) * pageSize,
                take: pageSize,
                keyword,
                sortBy,
                order,
            },
        });
    },

    getRoundById(
        roundId: number,
        address: string
    ): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel>>> {
        return httpService.post(`${baseUrl}/user/round`, { roundId, address });
    },

    getCurrentRound(): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel>>> {
        return httpService.get(`${baseUrl}/round`);
    },

    addRound(
        roundData: GetRoundApiModel
    ): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel>>> {
        return httpService.post(`${baseUrl}/round`, {
            endTime: roundData.endTime,
            ticketPrice: roundData.ticketPrice,
            bonusBnbAmount: roundData.bonusBnbAmount,
            bnbAddedFromLastRound: roundData.bnbAddedFromLastRound,
            pools: roundData.pools,
        });
    },

    updateRound(
        roundData: GetRoundApiModel
    ): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel>>> {
        return httpService.put(`${baseUrl}/round`, {
            endTime: roundData.endTime,
            bonusBnbAmount: roundData.bonusBnbAmount,
            pools: roundData.pools,
        });
    },

    finishRound(): Promise<AxiosResponse<ApiResponseResult<boolean>>> {
        return httpService.get(`${baseUrl}/finishround`);
    },

    getRounds(): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel[]>>> {
        return httpService.get(`${baseUrl}/allrounds`);
    },

    fetchRound(id: number): Promise<AxiosResponse<ApiResponseResult<boolean>>> {
        return httpService.get(`${baseUrl}/fetchround/${id}`);
    },
};
