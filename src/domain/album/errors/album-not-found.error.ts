import { DomainError } from '@domain/errors/domain.error';

export class AlbumNotFoundError extends DomainError {
  constructor(id: number) {
    super('Album not found', `Album with id ${id} not found`, 'NOT_FOUND');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
