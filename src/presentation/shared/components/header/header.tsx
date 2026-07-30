import { cn } from 'lib-styleguide-simba/utils';
import { IconSearch, IconSun, IconMoon } from 'lib-styleguide-simba/icons';
import { Button } from 'lib-styleguide-simba/button';

import { NotificationSection } from '../notification-section';
import type { IHeaderProps } from './header.interfaces';
import './header.css';

export const Header = ({
  searchQuery = '',
  notifications = [],
  unreadCount = 0,
  theme = 'light',
  onSearchChange,
  onToggleTheme,
  rootProps,
}: IHeaderProps) => {
  const Icon = theme === 'dark' ? IconSun : IconMoon;

  return (
    <header {...rootProps} className={cn('header-container', rootProps?.className)}>
      <div className="hc__wrapper">
        <div className="hc__search">
          <IconSearch className="hc__search-icon" />
          <input
            className="hc__search-input"
            type="text"
            placeholder="Search posts, users, comments..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>

        <div className="hc__actions">
          <NotificationSection notifications={notifications} unreadCount={unreadCount} />

          <Button size="icon" variant="text" onClick={onToggleTheme}>
            <Icon className="hc__theme-icon" />
          </Button>
        </div>
      </div>
    </header>
  );
};
