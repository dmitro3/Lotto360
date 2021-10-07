import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof CustomError)
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });

    console.error(err);
    const result: ApiResponseResult = {
        success: false,
        messages: [
            { message: "Something went wrong", type: ResponseMessageType.TRANSACTION },
        ],
        result: null,
        exception: err,
    };
    res.status(400).send(result);
};

export default interface ApiResponseResult {
    success: boolean;
    result?: any;
    messages?: ResponseMessage[];
    exception?: Error;
}

export interface ResponseMessage {
    type: ResponseMessageType;
    message: string;
}

export enum ResponseMessageType {
    ERROR = 1,
    WARNING,
    INFO,
    SUCCESS,
    TRANSACTION,
}

export interface ListResult<T> {
    items: T;
    totalCount: number;
}
