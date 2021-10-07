import { ValidationError } from "express-validator";
import ApiResponseResult, { ResponseMessageType } from "../middlewares/error-handler";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super("Error validating request");

        // call this because we extend built in javascript class (Error)
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        const response: ApiResponseResult = {
            success: false,
            messages: [{ message: this.message, type: ResponseMessageType.ERROR }],
            result: this.errors,
        };
        return response;
    }
}
