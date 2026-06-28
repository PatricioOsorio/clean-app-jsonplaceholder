/* eslint-disable no-useless-assignment */
import { HttpError } from '@domain/http';
import type { IDomainErrorCode } from '@domain/errors/error-codes';

export abstract class HttpErrorMapper {
  static toDomainError(status: number, message: string): HttpError {
    let code: IDomainErrorCode = 'INTERNAL_ERROR';
    let title = 'Server Error';

    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;

    switch (status) {
      case 400:
        code = 'VALIDATION_ERROR';
        title = 'Bad Request';
        break;
      case 401:
        code = 'UNAUTHORIZED';
        title = 'Unauthorized';
        break;
      case 403:
        code = 'FORBIDDEN';
        title = 'Forbidden';
        break;
      case 404:
        code = 'NOT_FOUND';
        title = 'Not Found';
        break;
      case 500:
      default:
        if (isOffline) {
          code = 'NETWORK_ERROR';
          title = 'Network Offline';
        } else {
          code = 'INTERNAL_ERROR';
          title = 'Server Error';
        }
        break;
    }

    return new HttpError(title, message, code);
  }
}
