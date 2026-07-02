import { DomainError } from '@domain/errors/domain.error';
import type { IValidationIssue } from '@domain/shared/validator.entity';

export class CommentInvalidDataError extends DomainError {
  constructor(
    message?: string,
    public readonly issues?: IValidationIssue[],
  ) {
    super('Comment Invalid Data', message || `Comment has invalid data`, 'VALIDATION_ERROR');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
