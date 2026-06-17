export interface ValidatorEntity<T> {
  validate(input: unknown): T;
}
