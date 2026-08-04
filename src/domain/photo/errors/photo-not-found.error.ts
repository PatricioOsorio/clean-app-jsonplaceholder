import { DomainError } from '@domain/errors';

export class PhotoNotFoundError extends DomainError {
  readonly code = 'PHOTO_NOT_FOUND';

  constructor(public readonly photoId: number) {
    super(`Photo with ID ${photoId} was not found.`);
    this.name = 'PhotoNotFoundError';
  }
}
