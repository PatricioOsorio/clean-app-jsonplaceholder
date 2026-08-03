import { StatusContent } from 'lib-styleguide-simba/status-content';
import { cn } from 'lib-styleguide-simba/utils';

import type { IHomeMetricsStripProps } from './home-metrics-strip.interfaces';

import { HomeMetricItem } from '../home-metric-item';
import { HomeMetricsStripSkeleton } from './skeleton/skeleton';
import './home-metrics-strip.css';

export const HomeMetricsStrip = ({ metrics, rootProps, status = {} }: IHomeMetricsStripProps) => {
  return (
    <section {...rootProps} className={cn('home-metrics-strip-container', rootProps?.className)}>
      <StatusContent
        {...status}
        loadingTemplate={status.loadingTemplate ?? <HomeMetricsStripSkeleton />}
      >
        {metrics?.map((item, index) => (
          <HomeMetricItem key={item.metric?.label ?? `metric-item-${index}`} {...item} />
        ))}
      </StatusContent>
    </section>
  );
};

HomeMetricsStrip.Skeleton = HomeMetricsStripSkeleton;
