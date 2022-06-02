import { ApiError } from "./ApiError";
export declare class ServerSideError extends ApiError {
    statusCode: number;
    constructor();
}
