import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useTheme } from 'lib-styleguide-simba/theme-provider';
import {
  IconHome,
  IconSquareRoundedPlus,
  IconFileDescription,
} from 'lib-styleguide-simba/icons-svg';

import { type IAsideItemsVM, type INotificationItemVM } from '@presentation/shared/components';
import { useAuthContext } from '@presentation/features/auth/providers';

const DEFAULT_NOTIFICATIONS: INotificationItemVM[] = [
  { id: '1', title: 'New comment on Post #1', time: '2 mins ago', isRead: false },
  { id: '2', title: 'User 5 updated profile', time: '1 hour ago', isRead: false },
  { id: '3', title: 'System update completed', time: '3 hours ago', isRead: false },
];

export const useAppLayout = () => {
  const { userSession, logout: handleLogout } = useAuthContext();
  const { preference, setPreference } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState<INotificationItemVM[]>(DEFAULT_NOTIFICATIONS);

  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  const handleToggleTheme = () => {
    setPreference(preference === 'dark' ? 'light' : 'dark');
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const user = userSession
    ? {
        userName: userSession.userName,
        email: userSession.email,
        roles: ['User'],
      }
    : null;

  const asideItems: IAsideItemsVM[] = [
    {
      items: [
        {
          icon: IconHome,
          label: 'Home',
          href: '/',
          isActive: location.pathname === '/',
        },
        {
          icon: IconFileDescription,
          label: 'Publications',
          href: '/posts',
          isActive: location.pathname.startsWith('/posts'),
        },
        // {
        //   icon: IconSquareRoundedPlus,
        //   label: 'Create Post',
        //   href: '/posts/create',
        //   isActive: location.pathname === '/posts/create',
        // },
      ],
    },
  ];

  return {
    // Aside props
    user,
    asideItems,
    handleLogout,
    handleLoginClick,

    // Header props
    searchQuery,
    handleSearchChange,
    notifications,
    unreadCount: notifications.filter((n) => !n.isRead).length,
    theme: preference,
    handleToggleTheme,
  };
};
