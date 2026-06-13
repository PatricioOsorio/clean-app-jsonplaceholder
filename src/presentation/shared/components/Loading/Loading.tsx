import { Spinner } from 'styleguide/spinner';
import { cn } from 'styleguide/utils';

import type { ILoadingProps } from './Loading.interfaces';

import './Loading.css';

export const Loading = ({ rootProps, spinnerProps }: ILoadingProps) => {
  return (
    <section {...rootProps} className={cn('loading-container', rootProps?.className)}>
      <Spinner {...spinnerProps} className={cn('lc__spinner', spinnerProps?.className)} />
    </section>
  );
};
