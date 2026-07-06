import { DomainError } from '@domain/errors/domain.error';
import type { IValidationIssue } from '@domain/shared/validator.entity';

export class AuthInvalidDataError extends DomainError {
  constructor(
    message?: string,
    public readonly issues?: IValidationIssue[],
  ) {
    super('Auth Invalid Data', message || `Auth has invalid data`, 'VALIDATION_ERROR');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
