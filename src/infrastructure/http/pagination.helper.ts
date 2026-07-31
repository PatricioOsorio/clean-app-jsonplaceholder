import type { IHttpResponse } from '@domain/http';
import type { IPaginatedResult } from '@domain/shared';

export function toPaginatedResult<TResponse, TEntity>(
  response: IHttpResponse<TResponse[]>,
  mapper: (data: TResponse[]) => TEntity[],
): IPaginatedResult<TEntity> {
  const headerCount = response.headers?.['x-total-count'];
  const dataCount = Array.isArray(response.data) ? response.data.length : 0;

  const total = Number(headerCount ?? dataCount ?? 0);
  const entities = mapper(response.data);

  return {
    data: entities,
    total,
  };
}
