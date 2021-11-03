import { AxiosResponse } from "axios";

import { baseUrl } from "../config/config";
import { httpService } from "./api.service";
import ApiResponseResult from "./models/response.model";
import { CheckForWin, GetRoundApiModel } from "./models/round.model";

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

    setNewTicketPerBuy(amount: number): Promise<AxiosResponse<ApiResponseResult<void>>> {
        return httpService.post(`${baseUrl}/ticketsperbuy/${amount}`);
    },

    setNewOwner(address: string): Promise<AxiosResponse<ApiResponseResult<void>>> {
        return httpService.post(`${baseUrl}/transferownership/${address}`);
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

    getRemainingBnb(): Promise<AxiosResponse<ApiResponseResult<number>>> {
        return httpService.get(`${baseUrl}/calculateremainingbnb`);
    },

    getSettings(): Promise<AxiosResponse<ApiResponseResult<any>>> {
        return httpService.get(`${baseUrl}/getsettings`);
    },

    checkForWin(address: string): Promise<AxiosResponse<ApiResponseResult<CheckForWin>>> {
        return httpService.post(`${baseUrl}/user/checkwin/${address}`);
    },

    getUserHistory(
        address: string
    ): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel[]>>> {
        return httpService.post(`${baseUrl}/user/checkhistory/${address}`);
    },
};
