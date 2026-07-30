import { Outlet } from 'react-router';

import { SidebarInset, SidebarProvider } from 'lib-styleguide-simba/shadcn/sidebar';
import { Aside, Footer, Header } from '@presentation/shared/components';
import { useAppLayout } from '@presentation/shared/layouts/app-layout/use-app-layout';
import './app-layout.css';

export const AppLayout = () => {
  const {
    // Aside props & handlers
    user,
    asideItems,
    handleLogout,
    handleLoginClick,

    // Header props & handlers
    searchQuery,
    handleSearchChange,
    notifications,
    unreadCount,
    theme,
    handleToggleTheme,
  } = useAppLayout();

  return (
    <SidebarProvider defaultOpen={true}>
      <Aside
        items={asideItems}
        user={user}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
      />

      <SidebarInset className="app-layout-container">
        <Header
          searchQuery={searchQuery}
          notifications={notifications}
          unreadCount={unreadCount}
          theme={theme}
          onSearchChange={handleSearchChange}
          onToggleTheme={handleToggleTheme}
        />

        <div className="alc__viewport">
          <Outlet />
        </div>

        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};
