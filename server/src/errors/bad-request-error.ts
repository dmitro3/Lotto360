import { AnyKeys } from "mongoose";
import ApiResponseResult, { ResponseMessageType } from "../middlewares/error-handler";
import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode = 400;
    constructor(
        public message: string,
        public type: ResponseMessageType,
        public err?: any
    ) {
        super(message);

        // call this because we extend built in javascript class (Error)
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        const response: ApiResponseResult = {
            success: false,
            messages: [{ message: this.message, type: this.type }],
            exception: this.err,
        };
        return response;
    }
}
