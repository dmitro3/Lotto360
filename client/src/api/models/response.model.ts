export default interface ApiResponseResult<T> {
    success: boolean;
    result?: T;
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
}

export interface ListResult<T> {
    items: T;
    totalCount: number;
}
