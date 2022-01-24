import ApiResponseResult from "./models/response.model";
import { AxiosResponse } from "axios";
import { baseUrl } from "../config/config";
import { httpService } from "./api.service";

export const DiceApiService = {
    dropDice: async (
        guess: number,
        rollId: number,
        address: string
    ): Promise<AxiosResponse<ApiResponseResult<any>>> => {
        return httpService.post(`${baseUrl}/rolldice`, { guess, rollId, address });
    },
};
