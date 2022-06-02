import {ApiError} from "./ApiError";

export class NotFoundError extends ApiError {
  statusCode = 404;
  constructor() {
    super("Route Not Found");
  }
}
