import { Spinner } from 'lib-styleguide-simba/shadcn/spinner';
import { cn } from 'lib-styleguide-simba/utils';

import type { ILoadingProps } from './Loading.interfaces';

import './Loading.css';

export const Loading = ({ rootProps, spinnerProps }: ILoadingProps) => {
  return (
    <section {...rootProps} className={cn('loading-container', rootProps?.className)}>
      <Spinner {...spinnerProps} className={cn('lc__spinner', spinnerProps?.className)} />
      <span className="lc__label">Loading</span>
    </section>
  );
};
