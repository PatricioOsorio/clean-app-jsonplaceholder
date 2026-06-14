import { DomainError } from '@domain/errors/domain.error';

export interface IFormattedError {
  errorTitle: string;
  errorMessage: string;
}
export const formatError = (
  error: unknown,
  fallbackTitle = 'Error',
  fallbackMessage = 'An unexpected error occurred.',
): IFormattedError => {
  if (!error) {
    return { errorTitle: '', errorMessage: '' };
  }

  if (error instanceof DomainError) {
    return { errorTitle: error.title, errorMessage: error.message };
  }

  if (error instanceof Error) {
    return { errorTitle: fallbackTitle, errorMessage: error.message };
  }

  return { errorTitle: fallbackTitle, errorMessage: fallbackMessage };
};
