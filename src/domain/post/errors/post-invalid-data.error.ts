import { DomainError } from '@domain/errors/domain.error';
import type { ValidationIssue } from '@domain/shared/validator.entity';

export class PostInvalidDataError extends DomainError {
  constructor(message?: string, public readonly issues?: ValidationIssue[]) {
    super('Post Invalid Data', message || `Post has invalid data`);
    this.name = 'PostInvalidDataError';
  }
}

