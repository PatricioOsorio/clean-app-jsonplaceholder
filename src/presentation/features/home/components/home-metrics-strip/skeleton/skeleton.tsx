import { cn } from 'lib-styleguide-simba/utils';

import type { IHomeMetricsStripSkeletonProps } from './skeleton.interfaces';

import { HomeMetricItem } from '../../home-metric-item';
import './skeleton.css';

export const HomeMetricsStripSkeleton = ({
  items = 6,
  rootProps,
}: IHomeMetricsStripSkeletonProps) => {
  return (
    <div
      {...rootProps}
      className={cn('home-metrics-strip-skeleton-container', rootProps?.className)}
    >
      {Array.from({ length: items }).map((_, i) => (
        <HomeMetricItem.Skeleton key={`metrics-skeleton-${i}`} />
      ))}
    </div>
  );
};
