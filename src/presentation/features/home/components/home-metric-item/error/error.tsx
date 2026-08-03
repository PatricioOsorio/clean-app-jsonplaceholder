import { cn } from 'lib-styleguide-simba/utils';

import type { IHomeMetricItemErrorProps } from './error.interfaces';

import './error.css';

export const HomeMetricItemError = ({ rootProps }: IHomeMetricItemErrorProps) => {
  return (
    <div {...rootProps} className={cn('home-metric-item-error-container', rootProps?.className)}>
      <div className="hmier__label-group">
        <span className="hmier__name">Couldn't load</span>
      </div>
      <span className="hmier__value">—</span>
    </div>
  );
};
