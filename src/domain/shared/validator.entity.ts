export type ValidationIssue = {
  field: string;
  message: string;
};

export interface ValidatorEntity<T> {
  validate(input: unknown): T;
}
