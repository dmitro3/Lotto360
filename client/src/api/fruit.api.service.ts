import { AxiosResponse } from "axios";
import { baseUrl } from "../config/config";
import { httpService } from "./api.service";
import ApiResponseResult from "./models/response.model";

export const FruitApiService = {
    spinSlot: async (
        spinId: number,
        address: string,
        numericFruits: number
    ): Promise<AxiosResponse<ApiResponseResult<any>>> => {
        return httpService.post(`${baseUrl}/spinslotfruit`, {
            spinId,
            address,
            numericFruits,
        });
    },
};
