import { ErrorCode } from "../ErrorCode";
import { ApplicationError } from "./ApplicationError";

export class InvalidCredentialError extends ApplicationError {
  public override statusCode = 401;

  public override code: ErrorCode;

	constructor() {
		super();

    this.name = 'InvalidCredentialsError';
    this.message = 'Invalid credentials.';
    this.code = ErrorCode.INVALID_CREDENTIALS;
	}
}
