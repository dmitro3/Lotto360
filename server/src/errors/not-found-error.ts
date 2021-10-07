import ApiResponseResult, { ResponseMessageType } from "../middlewares/error-handler";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor(public message: string) {
        super("Route not found");
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        const response: ApiResponseResult = {
            success: false,
            messages: [{ message: this.message, type: ResponseMessageType.ERROR }],
        };
        return response;
    }
}
