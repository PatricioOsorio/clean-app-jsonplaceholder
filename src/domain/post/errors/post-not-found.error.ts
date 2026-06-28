import { DomainError } from '@domain/errors/domain.error';

export class PostNotFoundError extends DomainError {
  constructor(id: number) {
    super('Post not found', `Post with id ${id} not found`, 'NOT_FOUND');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
