import { Outlet } from 'react-router-dom';
import './auth-layout.css';

export const AuthLayout = () => {
  return (
    <main className="auth-layout-container">
      <Outlet />
    </main>
  );
};
