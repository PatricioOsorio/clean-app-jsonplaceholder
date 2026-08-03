import {
  IconArticle,
  IconChecklist,
  IconFolder,
  IconMessageCircle,
  IconPhoto,
  IconUsers,
} from 'lib-styleguide-simba/icons';
import { StatusContent } from 'lib-styleguide-simba/status-content';
import { cn } from 'lib-styleguide-simba/utils';

import type { IHomeMetricItemProps, MetricIconType } from './home-metric-item.interfaces';

import { HomeMetricItemEmpty } from './empty/empty';
import { HomeMetricItemError } from './error/error';
import { HomeMetricItemSkeleton } from './skeleton/skeleton';
import './home-metric-item.css';

const renderMetricIcon = (iconName?: MetricIconType) => {
  switch (iconName) {
    case 'posts':
      return <IconArticle className="hmi__icon" />;
    case 'comments':
      return <IconMessageCircle className="hmi__icon" />;
    case 'albums':
      return <IconFolder className="hmi__icon" />;
    case 'photos':
      return <IconPhoto className="hmi__icon" />;
    case 'users':
      return <IconUsers className="hmi__icon" />;
    case 'todos':
      return <IconChecklist className="hmi__icon" />;
    default:
      return null;
  }
};

export const HomeMetricItem = ({ metric, rootProps, status = {} }: IHomeMetricItemProps) => {
  return (
    <div {...rootProps} className={cn('home-metric-item-container', rootProps?.className)}>
      <StatusContent
        {...status}
        loadingTemplate={<HomeMetricItemSkeleton />}
        emptyTemplate={<HomeMetricItemEmpty />}
        errorTemplate={<HomeMetricItemError />}
      >
        {metric && (
          <>
            <div className="hmi__label-group">
              {renderMetricIcon(metric.iconName)}
              <span className="hmi__name">{metric.label}</span>
            </div>
            <span className="hmi__value">{metric.count}</span>
          </>
        )}
      </StatusContent>
    </div>
  );
};

HomeMetricItem.Skeleton = HomeMetricItemSkeleton;
HomeMetricItem.Empty = HomeMetricItemEmpty;
HomeMetricItem.Error = HomeMetricItemError;
