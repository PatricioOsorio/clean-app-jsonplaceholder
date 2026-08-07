import { createContext, use, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import { AuthMapper, type IAuthVM } from '@presentation/features/auth/models';
import { useAuthDependencies } from '@presentation/features/auth/hooks';

export interface IAuthContext {
  userSession: IAuthVM | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isRegistering: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = (): IAuthContext => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};

interface IAuthProviderProps extends PropsWithChildren {}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const { auth, validators } = useAuthDependencies();

  const [userSession, setUserSession] = useState<IAuthVM | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  useEffect(() => {
    const loadUserSession = async () => {
      setIsLoading(true);

      try {
        const userSession = await auth.getCurrentUser();
        if (!userSession) return setUserSession(null);

        setUserSession(AuthMapper.toVM(userSession));
      } catch (error) {
        setUserSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserSession();
  }, [auth]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const dto = validators.login.validate({ email, password });
      const userSession = await auth.login(dto);
      setUserSession(AuthMapper.toVM(userSession));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userName: string, email: string, password: string) => {
    setIsRegistering(true);
    try {
      const dto = validators.register.validate({ userName, email, password });
      const userSession = await auth.register(dto);
      setUserSession(AuthMapper.toVM(userSession));
    } finally {
      setIsRegistering(false);
    }
  };

  const handleLogout = async () => {
    await auth.logout();

    setUserSession(null);
  };

  const value = useMemo<IAuthContext>(
    () => ({
      userSession: userSession,
      isAuthenticated: !!userSession,
      isAuthenticating: isLoading,
      isRegistering,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
    }),
    [userSession, isLoading, isRegistering],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
};
