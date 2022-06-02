export declare abstract class ApiError extends Error {
    abstract statusCode: number;
    message: string;
    constructor(message: string);
    serializeError(): string;
}
