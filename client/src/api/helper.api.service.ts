import { AxiosResponse } from "axios";

import { baseUrl } from "../config/config";
import { DashboardModel, TransferTokenModel, Withdraws } from "../interfaces/dashboard";
import { PaymentAttrs } from "../interfaces/payments";
import { httpService } from "./api.service";
import ApiResponseResult from "./models/response.model";
import { CheckForWin, TicketAttrs } from "./models/round.model";

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

    withdraw(
        transferModel: TransferTokenModel
    ): Promise<AxiosResponse<ApiResponseResult<boolean>>> {
        return httpService.post(`${baseUrl}/withdraw/`, transferModel);
    },

    getDashboardStats(): Promise<AxiosResponse<ApiResponseResult<DashboardModel>>> {
        return httpService.get(`${baseUrl}/getbalancestats`);
    },

    getWithdraws(): Promise<AxiosResponse<ApiResponseResult<Withdraws[]>>> {
        return httpService.get(`${baseUrl}/getwithdraws`);
    },

    getTickets(): Promise<AxiosResponse<ApiResponseResult<TicketAttrs[]>>> {
        return httpService.get(`${baseUrl}/alltickets`);
    },

    getPayments(): Promise<AxiosResponse<ApiResponseResult<PaymentAttrs[]>>> {
        return httpService.get(`${baseUrl}/getpayments`);
    },

    getUserPayments(
        address: string
    ): Promise<AxiosResponse<ApiResponseResult<PaymentAttrs[]>>> {
        return httpService.get(`${baseUrl}/getuserpayments/${address}`);
    },
};
