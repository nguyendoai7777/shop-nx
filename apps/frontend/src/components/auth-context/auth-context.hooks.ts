import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RegisterFormDto, UserFromDetail } from '@types';
import { isPrivateRoute } from '@edge-runtime';
import { ResponseBase } from '@shop/type';
import { useStore } from 'zustand/react';
import { useAuthStore } from '@z-state';

export const useAuthContextHook = () => {
  const { clearError, setError } = useStore(useAuthStore, (state) => state);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentUrl = usePathname();

  const [user, setUser] = useState<RegisterFormDto>();
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

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

  const login = async (payload: RegisterFormDto) => {
    clearError();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password,
      }),
    });
    const r: ResponseBase<UserFromDetail> = await res.json();
    try {
      if (r.data) {
        setUser(r.data.user);
        const returnUrl = searchParams.get('returnUrl');
        if (returnUrl) {
          router.push(returnUrl);
        }
      } else {
        setError(r.message);
      }
    } catch (err) {}
    return r;
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

  const register = async (payload: RegisterFormDto) => {
    setToastMsg('');
    clearError();
    const res = await fetch(`/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setError('');
    const data: ResponseBase<RegisterFormDto> = await res.json();
    try {
      if (data.status !== 200) {
        setError(data?.message);
      } else {
        setUser(data.data); // user từ Next API trả về
        setToastMsg(data.message);
      }
      const returnUrl = searchParams.get('returnUrl');
    } catch (e: any) {}
    return data;
  };

  return {
    register,
    logout,
    login,
    setUser,
    setToastMsg,
    user,
    loading,
    toastMsg,
  };
};
