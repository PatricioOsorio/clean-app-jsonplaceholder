import { DomainError } from '@domain/errors/domain.error';

export class AuthNotFoundError extends DomainError {
  constructor(email: string) {
    super('Auth failed', `Login with email: ${email} failed`, 'NOT_FOUND');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
