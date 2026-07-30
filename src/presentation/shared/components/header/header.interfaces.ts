import type { HTMLAttributes } from 'react';
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';
import type { INotificationItemVM } from '../notification-section';
import type { ThemePreference } from 'lib-styleguide-simba/theme-provider';

export interface IHeaderProps extends IWithRootProps<HTMLAttributes<HTMLElement>> {
  searchQuery?: string;
  notifications?: INotificationItemVM[];
  unreadCount?: number;
  theme?: ThemePreference;

  onSearchChange?: (query: string) => void;
  onToggleTheme?: () => void;
}
