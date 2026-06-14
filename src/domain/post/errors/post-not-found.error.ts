import { DomainError } from '@domain/errors/domain.error';

export class PostNotFoundError extends DomainError {
  constructor(id: number) {
    super('Post not found', `Post with id ${id} not found`);
    this.name = 'PostNotFoundError';
  }
}
