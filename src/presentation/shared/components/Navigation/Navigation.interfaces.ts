import type { IWithRootProps } from 'lib-styleguide-simba/component.interfaces';

export interface INavigationItem {
  label: string;
  to: string;
  end?: boolean;
}

export interface INavigationVM {
  items: INavigationItem[];
}

export interface INavigationProps extends IWithRootProps<'nav'>, INavigationVM {}
