import { DomainError } from '@domain/errors/domain.error';

export class PostInvalidDataError extends DomainError {
  constructor(message?: string) {
    super('Post Invalid Data', message || `Post has invalid data`);
    this.name = 'PostInvalidDataError';
  }
}
