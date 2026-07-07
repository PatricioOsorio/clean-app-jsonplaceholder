import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

export const AuthLayout = () => {
  return (
    <main className="auth-layout-container">
      <Outlet />
    </main>
  );
};
