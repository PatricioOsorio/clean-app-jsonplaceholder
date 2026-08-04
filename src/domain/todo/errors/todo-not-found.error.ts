import { DomainError } from '@domain/errors/domain.error';

export class TodoNotFoundError extends DomainError {
  constructor(id: number) {
    super('Todo not found', `Todo with id ${id} not found`, 'NOT_FOUND');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
