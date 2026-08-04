import { DomainError } from '@domain/errors';

export class PhotoInvalidDataError extends DomainError {
  readonly code = 'PHOTO_INVALID_DATA';

  constructor(message: string, public readonly details?: unknown) {
    super(message);
    this.name = 'PhotoInvalidDataError';
  }
}
