import { DomainError } from './domain.error';

export class NetworkError extends DomainError {
  constructor() {
    super('Network Error', 'Unable to reach server. Check internet connection.', 'NETWORK_ERROR');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
