import type { IGetQueryParams } from '@domain/shared';

/**
 * Applies pagination and sorting to a list of items in-memory.
 * @param items The list of items to process.
 * @param params Sorting and pagination criteria.
 * @returns The sorted and paginated list of items.
 */
export function applyPaginationAndSorting<T>(items: T[], params?: IGetQueryParams<T>): T[] {
  let result = [...items];

  if (params?.sort) {
    const sortField = params.sort;
    const sortOrder = params.sortOrder === 'desc' ? -1 : 1;

    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue < bValue) return -1 * sortOrder;
      if (aValue > bValue) return 1 * sortOrder;
      return 0;
    });
  }

  if (params?.page !== undefined && params?.limit !== undefined) {
    const startIndex = (params.page - 1) * params.limit;
    result = result.slice(startIndex, startIndex + params.limit);
  }

  return result;
}
