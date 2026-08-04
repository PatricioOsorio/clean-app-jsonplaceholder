import { DomainError } from '@domain/errors/domain.error';
import type { IValidationIssue } from '@domain/shared/validator.entity';

export class AlbumInvalidDataError extends DomainError {
  constructor(
    message?: string,
    public readonly issues?: IValidationIssue[],
  ) {
    super('Album Invalid Data', message || `Album has invalid data`, 'VALIDATION_ERROR');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
