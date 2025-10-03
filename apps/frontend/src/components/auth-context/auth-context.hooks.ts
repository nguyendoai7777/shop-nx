import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RegisterFormDto, UserFromDetail, UserFromDetailClient } from '@types';
import { ClientConfiguration, isPrivateRoute } from '@edge-runtime';
import { ResponseBase } from '@shop/type';
import { useStore } from 'zustand/react';
import { useAuthStore } from '@z-state';

export const useAuthContextHook = () => {
  const { clearError, setError, setUser } = useStore(useAuthStore, (state) => state);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentUrl = usePathname();

  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data: UserFromDetailClient) => {
        if (data.user) {
          setUser(data.user);
          ClientConfiguration.setMultiple(
            { token: data.accessToken, api: data.api }
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload: RegisterFormDto) => {
    clearError();
    setToastMsg('');
    setLoading(true);
    // const {} = await HttpClient.post(`/api/auth/login`)
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
        console.log(`error`, r.message);
        setError(r.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }

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
    setLoading(true);
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
        setToastMsg(data.message + ', ' + 'đăng nhập nhé!');
      }
      const returnUrl = searchParams.get('returnUrl');
    } catch (e: any) {
      console.log(`error`, e);
    } finally {
      setLoading(false);
    }
    setLoading(false);
    return data;
  };

  return {
    register,
    logout,
    login,
    setToastMsg,
    loading,
    toastMsg,
  };
};
