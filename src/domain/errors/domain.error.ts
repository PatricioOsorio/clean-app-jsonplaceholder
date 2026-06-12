export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    
    // child name auto-assign
    this.name = this.constructor.name;

    // fix required for extending built-in classes in ES5 targets
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
