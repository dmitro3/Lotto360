import { AxiosResponse } from "axios";

import { baseUrl } from "../config/config";
import { DashboardModel } from "../interfaces/dashboard";
import { httpService } from "./api.service";
import ApiResponseResult from "./models/response.model";
import { CheckForWin } from "./models/round.model";

export const HelperApiService = {
    setNewTicketPerBuy(amount: number): Promise<AxiosResponse<ApiResponseResult<void>>> {
        return httpService.post(`${baseUrl}/ticketsperbuy/${amount}`);
    },

    setNewOwner(address: string): Promise<AxiosResponse<ApiResponseResult<void>>> {
        return httpService.post(`${baseUrl}/transferownership/${address}`);
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

    getDashboardStats(): Promise<AxiosResponse<ApiResponseResult<DashboardModel>>> {
        return httpService.get(`${baseUrl}/getbalancestats`);
    },
};
