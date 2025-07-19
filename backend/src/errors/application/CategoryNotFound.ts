import { ErrorCode } from "../ErrorCode";
import { ApplicationError } from "./ApplicationError";

export class CategoryNotFoundError extends ApplicationError {
  public override statusCode = 404;

  public override code: ErrorCode;

  constructor() {
    super();

    this.name = 'CategoryNotFoundError';
    this.message = 'This category is not found.';
    this.code = ErrorCode.CATEGORY_NOT_FOUND;
  }
}
