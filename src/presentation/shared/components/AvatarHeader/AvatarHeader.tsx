import { useState } from 'react';
import { cn } from 'lib-styleguide-simba/utils';

import { type IAvatarHeaderProps } from './AvatarHeader.interfaces';
import './AvatarHeader.css';
import { getInitials } from '@presentation/utils';

export const AvatarHeader = ({ rootProps, user, onLogout, onLoginClick }: IAvatarHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout?.();
  };

  if (!user) {
    return (
      <div {...rootProps} className={cn('avatar-header-container', rootProps?.className)}>
        <button className="ahc__login-btn" type="button" onClick={onLoginClick}>
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div {...rootProps} className={cn('avatar-header-container', rootProps?.className)}>
      <button className="ahc__trigger" type="button" onClick={handleToggle}>
        <span className="ahc__initials">{getInitials(user.userName)}</span>
      </button>

      {isOpen && (
        <div className="ahc__dropdown">
          <div className="ahc__user-info">
            <span className="ahc__name">{user.userName}</span>
            <span className="ahc__email">{user.email}</span>
          </div>

          {user.roles && user.roles.length > 0 && (
            <div className="ahc__roles">
              {user.roles.map((role) => (
                <span key={role} className="ahc__role-tag">
                  {role}
                </span>
              ))}
            </div>
          )}

          <div className="ahc__divider" />

          <button className="ahc__logout-btn" type="button" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
