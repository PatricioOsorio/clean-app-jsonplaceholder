import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

import type { ReactNode } from 'react';

export interface IEmptyProps extends IWithRootProps<'div'> {
  title?: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
}
