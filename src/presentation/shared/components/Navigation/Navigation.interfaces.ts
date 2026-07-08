import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';
import type { IAvatarHeaderVM } from '@presentation/shared/components/AvatarHeader';

export interface INavigationItem {
  label: string;
  to: string;
  end?: boolean;
}

export interface INavigationVM {
  items: INavigationItem[];
}

export interface INavigationProps extends IWithRootProps<'nav'>, INavigationVM {
  user?: IAvatarHeaderVM | null;
  onLogout?: () => void;
  onLoginClick?: () => void;
}
