import { cn } from 'lib-styleguide-simba/utils';

import type { IHomeMetricItemEmptyProps } from './empty.interfaces';

import './empty.css';

export const HomeMetricItemEmpty = ({ rootProps }: IHomeMetricItemEmptyProps) => {
  return (
    <div {...rootProps} className={cn('home-metric-item-empty-container', rootProps?.className)}>
      <div className="hmie__label-group">
        <span className="hmie__name">No data</span>
      </div>
      <span className="hmie__value">—</span>
    </div>
  );
};
