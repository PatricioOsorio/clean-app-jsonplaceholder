import { Outlet } from 'react-router';

export const AppLayout = () => {
  return (
    <article className="app-layout">
      <Outlet />
    </article>
  );
};
