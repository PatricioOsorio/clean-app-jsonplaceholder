import { DomainError } from '@domain/errors';

export class CommentNotFoundError extends DomainError {
  constructor(id: number) {
    super('Comments not found', `Comments for post: ${id} not found`, 'NOT_FOUND');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
