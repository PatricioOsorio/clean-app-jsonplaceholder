import { cn } from 'lib-styleguide-simba/utils';

import type { IHomeMetricItemSkeletonProps } from './skeleton.interfaces';

import { Skeleton } from '@presentation/shared/components';
import './skeleton.css';

export const HomeMetricItemSkeleton = ({ rootProps }: IHomeMetricItemSkeletonProps) => {
  return (
    <div {...rootProps} className={cn('home-metric-item-skeleton-container', rootProps?.className)}>
      <div className="hmis__label-group">
        <Skeleton.Text className="h-4 w-4 shrink-0 rounded-full" />
        <Skeleton.Text className="h-3 w-16" />
      </div>
      <Skeleton.Text className="mt-1 h-7 w-12" />
    </div>
  );
};
