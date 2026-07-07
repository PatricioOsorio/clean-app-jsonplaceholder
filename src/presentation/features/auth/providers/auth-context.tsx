import { createContext, use, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import { AuthMapper, type IAuthVM } from '@presentation/features/auth/models';
import { useAuthDependencies } from '@presentation/features/auth/hooks';

// ! interfaces
export interface IAuthContext {
  userSession: IAuthVM | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ! context
export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = (): IAuthContext => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};

// ! provider
interface IAuthProviderProps extends PropsWithChildren {}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const { auth, validators } = useAuthDependencies();

  const [userSession, setUserSession] = useState<IAuthVM | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadUserSession = async () => {
      setIsLoading(true);

      try {
        const userSession = await auth.getCurrentUser();
        if (!userSession) return setUserSession(null);

        setUserSession(AuthMapper.toVM(userSession));
      } catch (error) {
        setUserSession(null);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    loadUserSession();
  }, [auth]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);

    const dto = validators.login.validate({ mail: email, password });

    const userSession = await auth.login(dto);

    setUserSession(AuthMapper.toVM(userSession));

    setIsLoading(false);
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
      login: handleLogin,
      logout: handleLogout,
    }),
    [userSession, isLoading],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
};
