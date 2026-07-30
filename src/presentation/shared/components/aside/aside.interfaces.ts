import type { ElementType } from 'react';
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';
import type { Sidebar } from 'lib-styleguide-simba/shadcn/sidebar';
import type { IAvatarHeaderVM } from '../avatar-header';

export interface IAsideItemVM {
  icon: ElementType;
  label: string;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
}

export interface IAsideItemsVM {
  label?: string;
  items: IAsideItemVM[];
}

export interface IAsideProps extends IWithRootProps<typeof Sidebar> {
  items: IAsideItemsVM[];
  user?: IAvatarHeaderVM | null;
  onLogout?: () => void;
  onLoginClick?: () => void;
}
