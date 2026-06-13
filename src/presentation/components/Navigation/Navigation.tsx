import { NavLink } from 'react-router';
import { cn } from 'styleguide/utils';

import type { INavigationProps } from './Navigation.interfaces';

import './Navigation.css';

export const Navigation = ({ rootProps, items }: INavigationProps) => {
  return (
    <nav {...rootProps} className={cn('navigation-container', rootProps?.className)}>
      <div className="nc__wrapper">
        <div className="nc__brand">
          <span className="nc__logo">◈</span>
          <span className="nc__title">CleanApp</span>
        </div>

        <ul className="nc__list">
          {items.map((item) => (
            <li key={item.to} className="nc__item">
              <NavLink
                className={({ isActive }) => cn('nc__link', isActive && 'nc__link--active')}
                end={item.to === '/'}
                to={item.to}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
