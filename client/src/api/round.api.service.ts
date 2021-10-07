import { AxiosResponse } from "axios";
import { baseUrl } from "../config/config";

import { httpService } from "./api.service";
import ApiResponseResult, { ListResult } from "./models/response.model";
import { GetRoundApiModel, GetRoundListViewModel } from "./models/round.model";

export const RoundApiService = {
    getAllRounds(): Promise<AxiosResponse<ApiResponseResult<GetRoundListViewModel>>> {
        return httpService.get(`${baseUrl}/user`);
    },

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
        userId: number | null
    ): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel>>> {
        return httpService.get(`${baseUrl}/user/${userId}`);
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

    UpdateRound(
        userData: GetRoundApiModel
    ): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel>>> {
        return httpService.put(`${baseUrl}/user`, userData);
    },

    uploadImage(
        file: File | null,
        userId: number | null,
        onUploadProgress: any
    ): Promise<AxiosResponse<ApiResponseResult<string>>> {
        let formData = new FormData();

        if (file && userId) {
            formData.append("id", `${userId}`);
            formData.append("profile_picture", file);
        }

        return httpService.post(`${baseUrl}/user/uploadimage`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    },
};