import { DomainError } from './domain.error';

export class NetworkError extends DomainError {
  constructor() {
    super('Network Error', 'Unable to reach server. Check internet connection.');
    this.name = 'NetworkError';
  }
}
