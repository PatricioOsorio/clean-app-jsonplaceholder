import type { ReactNode } from 'react';
import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
} from 'lib-styleguide-simba/component.interfaces';

export interface IStatusContentProps extends IWithLoading, IWithError, IWithEmpty {
  children: ReactNode;
}
