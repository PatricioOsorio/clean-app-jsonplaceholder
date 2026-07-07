import type { IWithChildren, IWithRootProps } from 'lib-styleguide-simba/interfaces';

import type { ReactNode } from 'react';

export interface IEmptyVM {
  title?: string;
  description?: string;
}

export interface IEmptyProps extends IWithRootProps<'div'>, IWithChildren, IEmptyVM {
  icon?: ReactNode;
}
