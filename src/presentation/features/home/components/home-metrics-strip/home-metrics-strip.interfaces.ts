import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface IHomeMetricItemVM {
  label: string;
  count: string | number;
  iconName: 'posts' | 'comments' | 'albums' | 'photos' | 'users' | 'todos';
}

export interface IHomeMetricsStripProps extends IWithRootProps<'section'> {
  metrics: IHomeMetricItemVM[];
}
