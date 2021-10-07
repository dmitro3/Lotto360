import ApiResponseResult, { ResponseMessageType } from "../middlewares/error-handler";
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = "Error connecting to database";
    statusCode = 500;
    constructor() {
        super("Error connecting to database");

        // call this because we extend built in javascript class (Error)
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        const response: ApiResponseResult = {
            success: false,
            messages: [{ message: this.message, type: ResponseMessageType.ERROR }],
        };
        return response;
    }
}
