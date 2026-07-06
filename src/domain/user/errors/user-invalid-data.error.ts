import { DomainError } from '@domain/errors';
import type { IValidationIssue } from '@domain/shared';

export class UserInvalidDataError extends DomainError {
  constructor(
    message?: string,
    public readonly issues?: IValidationIssue[],
  ) {
    super('User Invalid Data', message || `User has invalid data`, 'VALIDATION_ERROR');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
