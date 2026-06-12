export class PostInvalidDataError extends Error {
  constructor(message?: string) {
    super(message || `Post has invalid data`);
    this.name = 'PostInvalidDataError';
  }
}
