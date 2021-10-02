import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode = 400;
    constructor(public message: string) {
        super(message);

        // call this because we extend built in javascript class (Error)
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
