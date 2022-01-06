import { AxiosResponse } from "axios";

import { baseUrl } from "../config/config";
import { httpService } from "./api.service";
import ApiResponseResult from "./models/response.model";
import { GetRoundApiModel } from "./models/round.model";

export const RoundApiService = {
    getRoundById(
        roundId: number,
        address: string
    ): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel>>> {
        return httpService.post(`${baseUrl}/user/round`, { roundId, address });
    },

    getRoundByIdAdmin(
        roundId: number
    ): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel>>> {
        return httpService.get(`${baseUrl}/round/${roundId}`);
    },

    getRoundByIdAdminFromDb(
        roundId: number
    ): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel>>> {
        return httpService.get(`${baseUrl}/rounddb/${roundId}`);
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

    closeRound(): Promise<AxiosResponse<ApiResponseResult<boolean>>> {
        return httpService.get(`${baseUrl}/closeround`);
    },

    getRounds(): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel[]>>> {
        return httpService.get(`${baseUrl}/allrounds`);
    },

    fetchRound(id: number): Promise<AxiosResponse<ApiResponseResult<boolean>>> {
        return httpService.get(`${baseUrl}/fetchround/${id}`);
    },

    getUserHistory(
        address: string
    ): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel[]>>> {
        return httpService.post(`${baseUrl}/user/checkhistory/${address}`);
    },
};
