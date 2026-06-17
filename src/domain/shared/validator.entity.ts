export type IValidationIssue = {
  field: string;
  message: string;
};

export interface IValidatorEntity<T> {
  validate(input: unknown): T;
}
