import ApiResponseResult from "./models/response.model";
import { AxiosResponse } from "axios";
import { baseUrl } from "../config/config";
import { httpService } from "./api.service";
import { LoginApiModel, UserModel } from "./models/auth.models";

export const AuthenticationApiService = {
    signin(
        loginModel: LoginApiModel
    ): Promise<AxiosResponse<ApiResponseResult<UserModel>>> {
        return httpService.post(`${baseUrl}/admin/signin`, loginModel);
    },

    signout(): Promise<AxiosResponse<ApiResponseResult<void>>> {
        return httpService.post(`${baseUrl}/admin/signout`);
    },

    getCurrentUser(): Promise<AxiosResponse<ApiResponseResult<LoginApiModel>>> {
        return httpService.get(`${baseUrl}/admin/currentuser`);
    },
};
