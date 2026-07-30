import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from 'lib-styleguide-simba/shadcn/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'lib-styleguide-simba/shadcn/dropdown-menu';
import { Badge } from 'lib-styleguide-simba/badge';
import { IconLogout, IconLogin, IconSelector } from 'lib-styleguide-simba/icons';
import { cn } from 'lib-styleguide-simba/utils';
import { Button } from 'lib-styleguide-simba/button';

import { type IAvatarHeaderProps } from './avatar-header.interfaces';
import './avatar-header.css';
import { getInitials } from '@presentation/utils';

export const AvatarHeader = ({ rootProps, user, onLogout, onLoginClick }: IAvatarHeaderProps) => {
  if (!user) {
    return (
      <div {...rootProps} className={cn('avatar-header-container', rootProps?.className)}>
        <Button variant="text" className="ahc__login-btn" onClick={onLoginClick}>
          <IconLogin />
          <span>Sign In</span>
        </Button>
      </div>
    );
  }

  const isOnline = user.status !== 'offline';

  return (
    <div {...rootProps} className={cn('avatar-header-container', rootProps?.className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="ahc__trigger" type="button" title={user.userName}>
            <Avatar className="ahc__avatar">
              {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.userName} />}
              <AvatarFallback className="ahc__avatar-fallback">
                {getInitials(user.userName)}
              </AvatarFallback>
              <AvatarBadge
                className={cn('ahc__presence-dot', isOnline ? 'bg-emerald-500' : 'bg-zinc-400')}
              />
            </Avatar>

            <span className="ahc__meta">
              <span className="ahc__name-inline">{user.userName}</span>
              <span className="ahc__email-inline">{user.email}</span>
            </span>

            <IconSelector className="ahc__selector-icon" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="ahc__dropdown" align="end" side="top" sideOffset={8}>
          <DropdownMenuLabel className="ahc__user-card">
            <Avatar className="ahc__dropdown-avatar">
              {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.userName} />}
              <AvatarFallback className="ahc__avatar-fallback">
                {getInitials(user.userName)}
              </AvatarFallback>
            </Avatar>

            <div className="ahc__card-meta">
              <span className="ahc__name">{user.userName}</span>
              <span className="ahc__email">{user.email}</span>
            </div>
          </DropdownMenuLabel>

          {user.roles && user.roles.length > 0 && (
            <div className="ahc__roles">
              {user.roles.map((role) => (
                <Badge key={role} variant="outline" className="ahc__role-tag">
                  {role}
                </Badge>
              ))}
            </div>
          )}

          <DropdownMenuSeparator className="ahc__divider" />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onLogout}>
              <IconLogout />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
