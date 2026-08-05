import { useLocation, useNavigate } from 'react-router-dom';

export const useRedirectAfterLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectAfterLogin = () => {
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  return { redirectAfterLogin };
};
