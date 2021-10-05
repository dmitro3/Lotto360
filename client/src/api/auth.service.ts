import { AxiosResponse } from "axios";
import { baseUrl } from "../config/config";

import { httpService } from "./api.service";
import { LoginApiModel, RegisterApiModel } from "./models/auth.models";
import ApiResponseResult from "./models/response.model";
import { GetRoundApiModel } from "./models/round.model";

export default class AuthenticationApiService {
    login(
        loginModel: LoginApiModel
    ): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel>>> {
        return httpService.post(`${baseUrl}/auth/login`, loginModel);
    }

    register(
        registerModel: RegisterApiModel
    ): Promise<AxiosResponse<ApiResponseResult<GetRoundApiModel>>> {
        return httpService.post(`${baseUrl}/auth/register`, registerModel);
    }
}
