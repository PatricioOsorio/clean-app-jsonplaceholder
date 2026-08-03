import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/interfaces';

import type { IHomeMetricItemProps } from '../home-metric-item';

export interface IHomeMetricsStripProps extends IWithRootProps<'section'> {
  metrics?: IHomeMetricItemProps[];
  status?: IWithLoading & IWithError & IWithEmpty;
}
