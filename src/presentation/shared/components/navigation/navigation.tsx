import { NavLink } from 'react-router';
import { cn } from 'lib-styleguide-simba/utils';

import type { INavigationProps } from './navigation.interfaces';

import './navigation.css';
import { AvatarHeader } from '@presentation/shared/components/avatar-header';

export const Navigation = ({
  rootProps,
  items,
  user = null,
  onLogout,
  onLoginClick,
  isOpen = false,
  onClose,
}: INavigationProps) => {
  return (
    <>
      {isOpen && <div className="nc__scrim" onClick={onClose} />}

      <nav
        {...rootProps}
        className={cn(
          'navigation-container',
          isOpen && 'navigation-container--open',
          rootProps?.className,
        )}
      >
        <div className="nc__brand">
          <span className="nc__logo">◈</span>
          <span className="nc__title">CleanApp</span>
        </div>

        <ul className="nc__list">
          {items.map((item) => (
            <li key={item.to} className="nc__item">
              <NavLink
                className={({ isActive }) => cn('nc__link', isActive && 'nc__link--active')}
                end={item.end ?? item.to === '/'}
                to={item.to}
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nc__footer">
          <AvatarHeader user={user} onLoginClick={onLoginClick} onLogout={onLogout} />
        </div>
      </nav>
    </>
  );
};
