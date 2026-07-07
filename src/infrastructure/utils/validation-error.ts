import type { DomainError } from '@domain/errors';
import type { IValidationIssue } from '@domain/shared';
import { ZodError } from 'zod';

export const handleValidationError = (
  error: unknown,
  ErrorHandler: new (message: string, issues: IValidationIssue[]) => DomainError,
): never => {
  if (error instanceof ZodError) {
    const issues: IValidationIssue[] = error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    throw new ErrorHandler('Invalid input data. Please check the form fields.', issues);
  }
  throw error;
};
