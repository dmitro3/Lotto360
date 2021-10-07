import ApiResponseResult, { ResponseMessageType } from "../middlewares/error-handler";
import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super("Not Authorized");
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        const response: ApiResponseResult = {
            success: false,
            messages: [{ message: "Not Authorized", type: ResponseMessageType.ERROR }],
        };
        return response;
    }
}
