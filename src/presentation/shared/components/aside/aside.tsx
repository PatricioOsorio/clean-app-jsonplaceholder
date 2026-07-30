import { useNavigate } from 'react-router';
import { cn } from 'lib-styleguide-simba/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from 'lib-styleguide-simba/shadcn/sidebar';

import { AvatarHeader } from '../avatar-header';
import type { IAsideProps } from './aside.interfaces';
import './aside.css';
import { IconBrandLoom } from 'lib-styleguide-simba/icons';

export const Aside = ({ items, user = null, onLogout, onLoginClick, rootProps }: IAsideProps) => {
  const navigate = useNavigate();

  return (
    <Sidebar
      {...rootProps}
      className={cn('sidebar-container', rootProps?.className)}
      collapsible="icon"
    >
      <SidebarHeader className="sc__header">
        <div className="sc__logo-full">
          <span className="sc__logo-symbol">
            <IconBrandLoom />
          </span>
          <span className="sc__logo-text">CleanApp</span>
        </div>

        <div className="sc__logo-icon">
          <IconBrandLoom />
        </div>

        <SidebarTrigger className="sc__trigger"></SidebarTrigger>
      </SidebarHeader>

      <SidebarContent className="sc__content">
        {items.map(({ label, items: groupItems }) => (
          <SidebarGroup key={label} className="sc__group">
            {label && <SidebarGroupLabel className="sc__group-label">{label}</SidebarGroupLabel>}
            <SidebarMenu className="sc__menu">
              {groupItems.map(({ icon: Icon, label: itemLabel, isActive, href, onClick }) => (
                <SidebarMenuItem key={itemLabel}>
                  <SidebarMenuButton
                    className="sc__menu-button"
                    isActive={isActive}
                    tooltip={itemLabel}
                    onClick={() => {
                      onClick?.();
                      if (href) navigate(href);
                    }}
                  >
                    {Icon && <Icon />}
                    <span>{itemLabel}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="sc__footer">
        <AvatarHeader user={user} onLogout={onLogout} onLoginClick={onLoginClick} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
