import { ResponseBase } from '@shop/type';
import { AuthResponse, RegisterFormDto } from '@types';
import { zAuthStore } from '@client/z-state';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClientConfiguration } from '@client/utils';
import { isPrivateRoute } from '@core/route';

export const useAuthContextHook = () => {
  const { clearError, setError, setUser } = zAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentUrl = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then(({ data }: ResponseBase<AuthResponse>) => {
        if (data?.user) {
          setUser(data.user);
          ClientConfiguration.setMultiple({ token: data.accessToken, api: data.api });
        } else {
          setUser(void 0);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload: RegisterFormDto) => {
    clearError();
    setLoading(true);
    // const {} = await HttpClient.post(`/api/auth/login`)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: payload.username,
          password: payload.password,
        }),
      });
      const resource: ResponseBase<AuthResponse> = await res.json();
      if (resource.data?.user) {
        setUser(resource.data.user);
        ClientConfiguration.setMultiple({ token: resource.data.accessToken, api: resource.data.api });
        const returnUrl = searchParams.get('returnUrl');
        if (returnUrl) {
          router.push(returnUrl);
        }
      } else {
        setError(resource.message);
        setUser(void 0);
      }
      return resource;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout');
      if (!res.ok) return false;

      setUser(void 0);
      console.log({
        currentUrl,
        isPrivate: isPrivateRoute(currentUrl),
      });
      if (isPrivateRoute(currentUrl)) {
        console.log(`?? sao lai z nhi`);
        router.replace('/', {});
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  const register = async (payload: RegisterFormDto) => {
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
        // setToastMsg(data.message + ', ' + 'đăng nhập nhé!');
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
    setLoading,
    loading,
  };
};
