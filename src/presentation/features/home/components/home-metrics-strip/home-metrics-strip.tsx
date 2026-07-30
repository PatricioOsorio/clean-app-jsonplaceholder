import {
  IconArticle,
  IconChecklist,
  IconFolder,
  IconMessageCircle,
  IconPhoto,
  IconUsers,
} from 'lib-styleguide-simba/icons';
import { cn } from 'lib-styleguide-simba/utils';

import type { IHomeMetricItemVM, IHomeMetricsStripProps } from './home-metrics-strip.interfaces';
import './home-metrics-strip.css';

const renderMetricIcon = (iconName: IHomeMetricItemVM['iconName']) => {
  switch (iconName) {
    case 'posts':
      return <IconArticle className="hms__metric-icon" />;
    case 'comments':
      return <IconMessageCircle className="hms__metric-icon" />;
    case 'albums':
      return <IconFolder className="hms__metric-icon" />;
    case 'photos':
      return <IconPhoto className="hms__metric-icon" />;
    case 'users':
      return <IconUsers className="hms__metric-icon" />;
    case 'todos':
      return <IconChecklist className="hms__metric-icon" />;
  }
};

export const HomeMetricsStrip = ({ metrics, rootProps }: IHomeMetricsStripProps) => {
  return (
    <section {...rootProps} className={cn('home-metrics-strip-container', rootProps?.className)}>
      {metrics.map((item) => (
        <div key={item.label} className="hms__metric-item">
          <div className="hms__metric-label-group">
            {renderMetricIcon(item.iconName)}
            <span className="hms__metric-name">{item.label}</span>
          </div>
          <span className="hms__metric-value">{item.count}</span>
        </div>
      ))}
    </section>
  );
};
