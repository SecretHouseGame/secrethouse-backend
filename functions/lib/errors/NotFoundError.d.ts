import { ApiError } from "./ApiError";
export declare class NotFoundError extends ApiError {
    statusCode: number;
    constructor();
}
