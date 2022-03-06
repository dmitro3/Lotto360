import { AxiosResponse } from "axios";
import { baseUrl } from "../config/config";
import { httpService } from "./api.service";
import ApiResponseResult from "./models/response.model";

export const ColorsApiService = {
    spinSlot: async (
        spinId: number,
        address: string,
        numericColorss: number
    ): Promise<AxiosResponse<ApiResponseResult<any>>> => {
        return httpService.post(`${baseUrl}/spincolors`, {
            spinId,
            address,
            guess: numericColorss,
        });
    },
};
