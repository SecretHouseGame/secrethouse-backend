import { ApiError } from "./ApiError";
export declare class BadRequestError extends ApiError {
    statusCode: number;
    constructor(message: string);
}
