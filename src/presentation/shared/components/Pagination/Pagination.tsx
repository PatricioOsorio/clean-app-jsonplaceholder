import { cn } from 'lib-styleguide-simba/utils';
import { Pagination as UIPagination } from 'lib-styleguide-simba/pagination';

import type { IPaginationProps } from './Pagination.interfaces';

import './Pagination.css';

export const getPageRange = (
  page: number,
  totalPages: number,
  siblingCount = 1,
): (number | 'ellipsis')[] => {
  const range: (number | 'ellipsis')[] = [1];
  const start = Math.max(2, page - siblingCount);
  const end = Math.min(totalPages - 1, page + siblingCount);

  if (start > 2) {
    range.push('ellipsis');
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (end < totalPages - 1) {
    range.push('ellipsis');
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
};

export const Pagination = ({
  rootProps,
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: IPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageRange(page, totalPages, siblingCount);

  return (
    <UIPagination {...rootProps} className={cn('pagination-container', rootProps?.className)}>
      <UIPagination.Content>
        <UIPagination.Item>
          <UIPagination.Previous
            aria-disabled={page === 1}
            className={cn(page === 1 && 'pc__link--disabled')}
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
          />
        </UIPagination.Item>

        {pages.map((item, index) =>
          item === 'ellipsis' ? (
            <UIPagination.Item key={`ellipsis-${index}`}>
              <UIPagination.Ellipsis />
            </UIPagination.Item>
          ) : (
            <UIPagination.Item key={item}>
              <UIPagination.Link
                isActive={item === page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(item);
                }}
              >
                {item}
              </UIPagination.Link>
            </UIPagination.Item>
          ),
        )}

        <UIPagination.Item>
          <UIPagination.Next
            aria-disabled={page === totalPages}
            className={cn(page === totalPages && 'pc__link--disabled')}
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) onPageChange(page + 1);
            }}
          />
        </UIPagination.Item>
      </UIPagination.Content>
    </UIPagination>
  );
};
