import type { IDomainErrorCode } from './error-codes';

export class DomainError extends Error {
  public readonly title: string;
  public readonly gatewayCode?: IDomainErrorCode;

  constructor(title: string, message: string, gatewayCode: IDomainErrorCode) {
    super(message);

    this.title = title;
    this.name = this.constructor.name;
    this.gatewayCode = gatewayCode;

    // fix required for extending built-in classes in ES5 targets
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
