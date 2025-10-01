'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { isPrivateRoute } from '@edge-runtime';
import { AuthContextType, RegisterFormDto, UserInfo } from '@types';
import { useAuthStore } from '@z-state';
import { useStore } from 'zustand/react';
import { ResponseBase } from '@shop/type';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const { clearError, setError } = useStore(useAuthStore, (state) => state);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentUrl = usePathname();

  const [user, setUser] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload: RegisterFormDto): Promise<any> => {
    clearError();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: payload.username,
          password: payload.password,
        }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      setUser(data.user); // user từ Next API trả về

      const returnUrl = searchParams.get('returnUrl');
      if (returnUrl) {
        router.push(returnUrl);
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout');
      if (!res.ok) return false;

      setUser(void 0);
      if (isPrivateRoute(currentUrl)) {
        router.replace('/', {});
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  const register = async (payload: RegisterFormDto): Promise<any> => {
    clearError();
    const res = await fetch(`/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setError('');
    try {
      const data: ResponseBase<RegisterFormDto> = await res.json();
      if (data.status !== 200) {
        setError(data?.message);
      } else {
        setUser(data.data); // user từ Next API trả về
      }
      const returnUrl = searchParams.get('returnUrl');
      console.log(`@Register success`, data);
    } catch (e: any) {
      console.log(`@Register err`, e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loading, user, setUser, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
