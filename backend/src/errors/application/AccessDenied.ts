import { ErrorCode } from "../ErrorCode";
import { ApplicationError } from "./ApplicationError";

export class AccessDeniedError extends ApplicationError {
  public override statusCode = 403;

  public override code: ErrorCode;

  constructor() {
    super();

    this.name = "AccessDeniedError";
    this.message = "Access Denied.";
    this.code = ErrorCode.ACCESS_DENIED;
  }
}
