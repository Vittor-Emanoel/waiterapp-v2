import { ErrorCode } from '../ErrorCode';
import { ApplicationError } from './ApplicationError';

export class CategoryNameAlreadyInUseError extends ApplicationError {
  public override statusCode = 409;

  public override code: ErrorCode;

  constructor() {
    super();

    this.name = 'CategoryNameAlreadyInUseError';
    this.message = 'This category name is already in use.';
    this.code = ErrorCode.CATEGORY_NAME_ALREADY_IN_USE;
  }

}
