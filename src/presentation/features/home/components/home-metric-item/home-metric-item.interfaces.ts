import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/interfaces';

export type MetricIconType = 'posts' | 'comments' | 'albums' | 'photos' | 'users' | 'todos';

export interface IHomeMetricItemVM {
  label: string;
  count: string | number;
  iconName: MetricIconType;
}

export interface IHomeMetricItemProps extends IWithRootProps<'div'> {
  metric?: IHomeMetricItemVM;
  status?: IWithLoading & IWithError & IWithEmpty;
}
