export class DomainError extends Error {
  public readonly title: string;

  constructor(title: string = 'Domain Error', message: string) {
    super(message);

    this.title = title;
    this.name = this.constructor.name;

    // fix required for extending built-in classes in ES5 targets
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
