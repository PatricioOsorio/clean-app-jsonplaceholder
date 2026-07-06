import { DomainError } from '@domain/errors';

export class UserNotFoundError extends DomainError {
  constructor(id: number) {
    super('User not found', `User with id ${id} not found`, 'NOT_FOUND');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
