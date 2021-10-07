import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ACCESS_TOKEN_KEY } from "../config/config";
import { CustomToastWithLink } from "../utilities/toastLink";
import ApiResponseResult, {
    ResponseMessage,
    ResponseMessageType,
} from "./models/response.model";

axios.interceptors.response.use(
    (response: AxiosResponse<ApiResponseResult<any>>) => {
        if (response && response.status === 401)
            localStorage.removeItem(ACCESS_TOKEN_KEY);

        if (response.status === 200 && response.data.success) {
            const { headers } = response;
            if (headers["x-access-token"] && headers["x-refresh-token"]) {
                setJwt(headers["x-access-token"], headers["x-refresh-token"]);
                localStorage.setItem(ACCESS_TOKEN_KEY, headers["x-refresh-token"]);
            }
        }

        if (response.data && response.status) {
            const data: ApiResponseResult<any> = response.data;
            if (data.messages) {
                data.messages?.forEach((mes) => {
                    if (!mes.message.includes("not found")) toastMessage(mes);
                });
            }
        }

        return response;
    },
    (error: AxiosError<ApiResponseResult<any>>) => {
        if (error && error.response?.status === 401)
            localStorage.removeItem(ACCESS_TOKEN_KEY);

        if (error.response && error.response.data && error.response.data.messages) {
            const message = error.response.data.messages[0];
            toastMessage(message);
            if (error.response.data.exception) console.log(error.response.data.exception);
            return null;
        }

        if (
            error.response &&
            error.response.data &&
            // @ts-ignore
            error.response.data.errors &&
            // @ts-ignore
            error.response.data.errors.messages.length > 0
        ) {
            // @ts-ignore
            const message: ResponseMessage = error.response.data.errors.messages[0];
            if (message.type !== ResponseMessageType.TRANSACTION) toastMessage(message);
            else {
                toast.error(
                    CustomToastWithLink(
                        message.message,
                        "transaction failed click link for detail"
                    )
                );
            }
            if (error.response.data.exception) console.log(error.response.data.exception);
            return null;
        }

        if (error.response) {
            const message = error.message;
            const status = error.response.status;
            const statusText = error.response.statusText;
            toast.error(`${status}(${statusText}): ${message}`);
            return null;
        }
    }
);

const toastMessageArray: string[] = [];

const toastMessage = (mes: ResponseMessage): void => {
    const message = mes.message;

    if (toastMessageArray.includes(message)) return;

    toastMessageArray.push(message);
    setTimeout(() => {
        const index = toastMessageArray.indexOf(message);
        toastMessageArray.splice(index, 1);
    }, 6000);

    if (mes.type === ResponseMessageType.ERROR) toast.error(message);
    else if (mes.type === ResponseMessageType.INFO) toast.info(message);
    else if (mes.type === ResponseMessageType.SUCCESS) toast.success(message);
    else if (mes.type === ResponseMessageType.WARNING) toast.warning(message);
};

function setJwt(accessToken: string, refreshToken: string) {
    if (axios.defaults.headers) {
        // @ts-ignore
        axios.defaults.headers.common["x-access-token"] = accessToken;
        // @ts-ignore
        axios.defaults.headers.common["x-refresh-token"] = refreshToken;
    }
}

export { axios as httpService, setJwt };
