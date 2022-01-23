import { AxiosResponse } from "axios";
import { baseUrl } from "../config/config";
import { httpService } from "./api.service";
import ApiResponseResult from "./models/response.model";

export const BeastApiService = {
    spinSlot: async (
        spinId: number,
        address: string
    ): Promise<AxiosResponse<ApiResponseResult<any>>> => {
        return httpService.post(`${baseUrl}/spinslot`, { spinId, address });
    },
};
