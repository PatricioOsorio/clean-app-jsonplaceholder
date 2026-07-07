import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';
import type { IValidationIssue } from '@domain/shared';

export const mapIssuesToForm = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
): boolean => {
  if (!error || typeof error !== 'object' || !('issues' in error) || !Array.isArray(error.issues)) {
    return false;
  }

  (error.issues as IValidationIssue[]).forEach((issue) => {
    setError(issue.field as FieldPath<T>, { type: 'manual', message: issue.message });
  });

  return true;
};
