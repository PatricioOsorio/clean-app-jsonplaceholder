import { HttpError } from '@domain/http';
import { DomainError, NetworkError } from '@domain/errors';

export type ICustomErrorMapper = (
  error: HttpError,
  resourceId?: number | string,
) => Error | undefined;

export const createApiErrorHandler = (customMapper?: ICustomErrorMapper) => {
  return (error: unknown, resourceId?: number): never => {
    if (error instanceof DomainError) {
      throw error;
    }

    if (!(error instanceof HttpError)) {
      throw new NetworkError();
    }

    if (customMapper) {
      const mappedError = customMapper(error, resourceId);
      if (mappedError) {
        throw mappedError;
      }
    }

    throw new DomainError('API Error', error.message, error.gatewayCode || 'INTERNAL_ERROR');
  };
};
