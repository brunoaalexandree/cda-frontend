'use client';

import { queryClient } from '@/config/reactQuery';
import { STATE_STORAGE_LOCATION } from '@/const';
import parseJwt from '@/lib/parseJwt';
import { useRouter } from 'next/navigation';
import { user as fetchUser } from '@/services/profile';
import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

interface User {
  name?: string;
  email?: string;
  access_token: string;
  iat: number;
}

interface AuthState {
  user: User | undefined;
}

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  handleLogout: () => void;
  handleLogin: (token: string) => Promise<void>;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: User;
}

const initialAuthState: AuthState = {
  user: undefined,
};

export type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem(
        STATE_STORAGE_LOCATION,
        action.payload!.access_token,
      );
      return { user: action.payload };
    case 'LOGOUT':
      localStorage.removeItem(STATE_STORAGE_LOCATION);
      queryClient.clear();
      return { user: undefined };
    default:
      return state;
  }
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const router = useRouter();

  const handleLogout = useCallback(() => {
    localStorage.removeItem(STATE_STORAGE_LOCATION);
    queryClient.clear();

    dispatch({ type: 'LOGOUT' });

    router.push('/sign-in');
  }, []);

  const handleLogin = useCallback(
    async (token: string) => {
      try {
        const tokenData = parseJwt(token);
        const userData = await fetchUser(token);

        dispatch({
          type: 'LOGIN',
          payload: {
            ...userData,
            access_token: token,
            iat: tokenData.iat,
          },
        });
      } catch (error) {
        console.error('Failed to fetch user data', error);
        handleLogout(); // Sai se falhar
      }
    },
    [handleLogout],
  );

  useEffect(() => {
    const token = localStorage.getItem(STATE_STORAGE_LOCATION);

    if (!token) {
      handleLogout();
      return;
    }

    if (token) {
      const tokenData = parseJwt(token);

      const expiryTime = new Date(tokenData.exp * 1000);
      const currentTime = new Date();

      if (expiryTime < currentTime) {
        handleLogout();
      }
    }
  }, [handleLogout, state.user, state.user?.access_token]);

  const values = useMemo(
    () =>
      ({
        state,
        dispatch,
        handleLogout,
        handleLogin,
      }) as unknown as AuthContextType,
    [handleLogout, state, handleLogin],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuth must be used inside an AuthProvider');
  }

  return context;
};
