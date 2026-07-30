import type { HTMLAttributes } from 'react';
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface INotificationItemVM {
  id: string;
  title: string;
  time: string;
  isRead?: boolean;
}

export interface INotificationSectionProps extends IWithRootProps<HTMLAttributes<HTMLDivElement>> {
  isOpen?: boolean;
  onToggleOpen?: () => void;
  notifications?: INotificationItemVM[];
  unreadCount?: number;
}
