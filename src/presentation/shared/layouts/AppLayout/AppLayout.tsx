import { Outlet, useNavigate } from 'react-router';
import './AppLayout.css';
import { type INavigationItem, Navigation, Footer } from '@presentation/shared/components';
import { useAuthContext } from '@presentation/features/auth/providers';

export const AppLayout = () => {
  const { userSession, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  const navItems: INavigationItem[] = [
    { label: 'Home', to: '/' },
    { label: 'Publications', to: '/posts', end: true },
    { label: 'Create Post', to: '/posts/create' },
  ];

  return (
    <article className="app-layout-container">
      <Navigation
        items={navItems}
        user={userSession}
        onLoginClick={handleLoginClick}
        onLogout={logout}
      />

      <main className="alc__main">
        <Outlet />
      </main>

      <Footer />
    </article>
  );
};
