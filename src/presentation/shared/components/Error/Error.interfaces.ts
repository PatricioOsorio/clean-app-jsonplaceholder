import type { IWithChildren, IWithRootProps } from 'lib-styleguide-simba/interfaces';

import type { ReactNode } from 'react';

export interface IErrorVM {
  title?: string;
  description?: string;
}

export interface IErrorProps extends IWithRootProps<'div'>, IWithChildren, IErrorVM {
  icon?: ReactNode;
}
