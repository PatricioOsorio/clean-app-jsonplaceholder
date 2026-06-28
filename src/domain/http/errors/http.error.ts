import { DomainError } from '@domain/errors';
import type { IDomainErrorCode } from '@domain/errors/error-codes';

export class HttpError extends DomainError {
  constructor(title: string, message: string, gatewayCode: IDomainErrorCode) {
    super(title, message, gatewayCode);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
