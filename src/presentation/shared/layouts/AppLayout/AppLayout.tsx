import { Outlet } from 'react-router';
import { Navigation, type INavigationItem } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import './AppLayout.css';

export const AppLayout = () => {
  const navItems: INavigationItem[] = [
    { label: 'Home', to: '/' },
    { label: 'Publications', to: '/posts', end: true },
    { label: 'Create Post', to: '/posts/create' },
  ];

  return (
    <article className="app-layout">
      <Navigation items={navItems} />

      <main className="ap__main">
        <Outlet />
      </main>

      <Footer />
    </article>
  );
};
