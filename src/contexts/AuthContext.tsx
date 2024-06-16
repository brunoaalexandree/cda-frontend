'use client';

import { queryClient } from '@/config/reactQuery';
import { STATE_STORAGE_LOCATION, USER_STORAGE_LOCATION } from '@/const';
import parseJwt from '@/lib/parseJwt';
import { useRouter } from 'next/navigation';
import { user as fetchUser } from '@/services/profile';
import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
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
  user: User | null;
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
  user: null,
};

export type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      if (action.payload) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            STATE_STORAGE_LOCATION,
            action.payload.access_token,
          );
          localStorage.setItem(
            USER_STORAGE_LOCATION,
            JSON.stringify(action.payload),
          );
        }
      }
      return { user: action.payload || null };
    case 'LOGOUT':
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STATE_STORAGE_LOCATION);
        localStorage.removeItem(USER_STORAGE_LOCATION);
      }
      queryClient.clear();
      return { user: null };
    default:
      return state;
  }
};

const initializeAuthState = (): AuthState => {
  if (typeof window === 'undefined') {
    return initialAuthState;
  }

  const token = localStorage.getItem(STATE_STORAGE_LOCATION);
  const storedUser = localStorage.getItem(USER_STORAGE_LOCATION);

  if (token && storedUser) {
    try {
      const user = JSON.parse(storedUser) as User;
      return { user };
    } catch (error) {
      console.error('Failed to parse user data:', error);
      return initialAuthState;
    }
  }

  return initialAuthState;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(
    authReducer,
    undefined,
    initializeAuthState,
  );
  const router = useRouter();

  const handleLogout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STATE_STORAGE_LOCATION);
      localStorage.removeItem(USER_STORAGE_LOCATION);
    }
    queryClient.clear();
    dispatch({ type: 'LOGOUT' });
    router.push('/sign-in');
  }, [router]);

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
        handleLogout();
      }
    },
    [handleLogout],
  );

  const authValidation = () => {
    if (!state.user) {
      router.push('/sign-in');
    }
  };

  const values = useMemo(
    () => ({
      state,
      dispatch,
      handleLogout,
      handleLogin,
    }),
    [state, handleLogout, handleLogin],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
