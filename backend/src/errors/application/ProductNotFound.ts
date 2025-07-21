import { ErrorCode } from "../ErrorCode";
import { ApplicationError } from "./ApplicationError";

export class ProductNotFoundError extends ApplicationError {
  public override statusCode = 404;

  public override code: ErrorCode;

  constructor() {
    super();

    this.name = "ProductNotFoundError";
    this.message = "One or more products were not found.";
    this.code = ErrorCode.PRODUCT_NOT_FOUND;
  }
}
