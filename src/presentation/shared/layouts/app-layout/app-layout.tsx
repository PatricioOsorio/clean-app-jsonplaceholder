import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import './app-layout.css';
import { type INavigationItem, Navigation, Footer } from '@presentation/shared/components';
import { useAuthContext } from '@presentation/features/auth/providers';

export const AppLayout = () => {
  const { userSession, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  const navItems: INavigationItem[] = [
    { label: 'Home', to: '/' },
    { label: 'Publications', to: '/posts', end: true },
    { label: 'Create Post', to: '/posts/create' },
  ];

  return (
    <div className="app-layout-container">
      <Navigation
        items={navItems}
        user={userSession}
        isOpen={isMobileNavOpen}
        onLoginClick={handleLoginClick}
        onLogout={logout}
        onClose={() => setIsMobileNavOpen(false)}
      />

      <div className="alc__column">
        <button
          aria-label="Open menu"
          className="alc__menu-btn"
          type="button"
          onClick={() => setIsMobileNavOpen(true)}
        >
          <span className="alc__menu-icon" />
        </button>

        <main className="alc__main">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};
