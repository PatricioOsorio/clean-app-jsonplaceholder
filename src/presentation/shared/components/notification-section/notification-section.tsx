import { useState } from 'react';
import { cn } from 'lib-styleguide-simba/utils';
import { IconBell } from 'lib-styleguide-simba/icons';
import { Button } from 'lib-styleguide-simba/button';

import type { INotificationSectionProps } from './notification-section.interfaces';
import './notification-section.css';

export const NotificationSection = ({
  isOpen: controlledIsOpen,
  onToggleOpen,
  notifications = [],
  unreadCount = 0,
  rootProps,
}: INotificationSectionProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = controlledIsOpen !== undefined;
  const open = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (isControlled) {
      onToggleOpen?.();
    } else {
      setInternalIsOpen((prev) => !prev);
    }
  };

  return (
    <div {...rootProps} className={cn('notification-section-container', rootProps?.className)}>
      <Button className="nsc__trigger" variant="text" size="icon" onClick={handleToggle}>
        <IconBell className="nsc__trigger-icon" />
        {unreadCount > 0 && <span className="nsc__badge" />}
      </Button>

      {open && (
        <div className="nsc__dropdown">
          <div className="nsc__header">
            <span className="nsc__header-title">Notifications</span>
            {unreadCount > 0 && <span className="nsc__unread-tag">{unreadCount} new</span>}
          </div>

          <div className="nsc__list">
            {notifications.map((item) => (
              <div key={item.id} className="nsc__item">
                <p className="nsc__item-title">{item.title}</p>
                <span className="nsc__item-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
