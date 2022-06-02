import {ApiError} from "./ApiError";

export class ServerSideError extends ApiError {
  statusCode = 500;
  constructor() {
    super("Something went wrong");
  }
}
