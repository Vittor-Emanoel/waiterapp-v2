import { ErrorCode } from '../ErrorCode';
import { ApplicationError } from './ApplicationError';

export class EmailAlreadyInUseError extends ApplicationError {
  public override statusCode = 409;

  public override code: ErrorCode;

  constructor() {
    super();

    this.name = 'EmailAlreadyInUseError';
    this.message = 'This email is already in use.';
    this.code = ErrorCode.EMAIL_ALREADY_IN_USE;
  }

}
