import { DomainError, NetworkError } from '@domain/errors';
import { PostNotFoundError, PostInvalidDataError } from '@domain/post';
import {} from '@domain/post/errors/post-invalid-data.error';
import { getQueryParam, resolveDelay, withDelay } from '@infrastructure/utils';

/**
 * Dev-only: inject post errors via `?fault=` to simulate failures.
 * Shared by mock and local post repositories.
 *
 * - ?fault=network    => NetworkError
 * - ?fault=server     => DomainError('API Error', 500)
 * - ?fault=not-found  => PostNotFoundError
 * - ?fault=invalid    => PostInvalidDataError
 */
export const simulateFault = async (id?: number): Promise<void> => {
  const fault = getQueryParam('fault');
  if (!fault) return;

  await withDelay(null, resolveDelay()); // let the skeleton render before failing

  switch (fault) {
    case 'network':
      throw new NetworkError();
    case 'server':
      throw new DomainError('API Error', 'Simulated server error (500)');
    case 'not-found':
      throw new PostNotFoundError(id ?? 0);
    case 'invalid':
      throw new PostInvalidDataError('Simulated invalid post data');
    default:
      console.warn(`[dev] unknown fault "${fault}" — ignoring`);
  }
};
