import { DomainError } from '@domain/errors/domain.error';
import type { IValidationIssue } from '@domain/shared/validator.entity';

export class TodoInvalidDataError extends DomainError {
  constructor(
    message?: string,
    public readonly issues?: IValidationIssue[],
  ) {
    super('Todo Invalid Data', message || `Todo has invalid data`, 'VALIDATION_ERROR');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
