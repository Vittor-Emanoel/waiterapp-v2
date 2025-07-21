import { ErrorCode } from "../ErrorCode";
import { ApplicationError } from "./ApplicationError";

export class UserNotFoundError extends ApplicationError {
  public override statusCode = 404;

  public override code: ErrorCode;

  constructor() {
    super();

    this.name = "UserNotFound";
    this.message = "User is not found!";
    this.code = ErrorCode.USER_NOT_FOUND;
  }
}
