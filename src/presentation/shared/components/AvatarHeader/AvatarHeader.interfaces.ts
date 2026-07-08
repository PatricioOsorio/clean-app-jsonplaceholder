import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface IAvatarHeaderVM {
  userName: string;
  email: string;
  roles?: string[];
  avatarUrl?: string;
}

export interface IAvatarHeaderProps extends IWithRootProps<'div'> {
  user: IAvatarHeaderVM | null;
  onLogout?: () => void;
  onLoginClick?: () => void;
}
