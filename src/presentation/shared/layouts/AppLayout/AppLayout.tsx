import { Outlet } from 'react-router';
import './AppLayout.css';
import { type INavigationItem, Navigation, Footer } from '@presentation/shared/components';

export const AppLayout = () => {
  const navItems: INavigationItem[] = [
    { label: 'Home', to: '/' },
    { label: 'Publications', to: '/posts', end: true },
    { label: 'Create Post', to: '/posts/create' },
  ];

  return (
    <article className="app-layout-container">
      <Navigation items={navItems} />

      <main className="alc__main">
        <Outlet />
      </main>

      <Footer />
    </article>
  );
};
