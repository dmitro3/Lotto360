import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { CustomToastWithLink } from "../utilities/toastLink";
import ApiResponseResult, {
    ResponseMessage,
    ResponseMessageType,
} from "./models/response.model";

axios.interceptors.request.use((config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && config.headers) {
        config.headers.jwt = jwt;
    }
    return config;
});

axios.interceptors.response.use(
    (response: AxiosResponse<ApiResponseResult<any>>) => {
        if (response && response.data && response.status) {
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
        if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.messages
        ) {
            const message = error.response.data.messages[0];
            toastMessage(message);
            if (error.response.data.exception) console.log(error.response.data.exception);
            return null;
        }

        if (
            error &&
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

export { axios as httpService };
