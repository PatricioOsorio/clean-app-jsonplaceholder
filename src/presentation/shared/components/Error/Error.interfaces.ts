import type { IWithRootProps } from 'lib-styleguide-simba/component.interfaces';

import type { ReactNode } from 'react';

export interface IErrorProps extends IWithRootProps<'div'> {
  title?: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
}
