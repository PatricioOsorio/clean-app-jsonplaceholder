import type { IWithRootProps } from 'lib-styleguide-simba/component.interfaces';

export interface IPaginationProps extends IWithRootProps<'nav'> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}
