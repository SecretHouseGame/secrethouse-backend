import { ApiError } from "./ApiError";
export declare class UnauthorizedError extends ApiError {
    statusCode: number;
    constructor();
}
