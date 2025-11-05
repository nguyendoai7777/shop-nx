'use client';

import { useEffect } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';
import type { AuthResponse } from '@types';
import { ResponseBase } from '@shop/type';
import { zAuthStore } from '@client/z-state';
import { ClientConfiguration } from '@client/utils';

export function AppInitConfig() {
  const { setUser, setApiUrl, setLoading } = zAuthStore();
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        return res.json();
      })
      .then(({ data }: ResponseBase<AuthResponse>) => {
        if (data?.user) {
          setUser(data.user);
          setApiUrl(data.api);
          ClientConfiguration.setMultiple({ token: data.accessToken, api: data.api });
        } else {
          ClientConfiguration.setMultiple({ api: data.api });
          setUser(void 0);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined' && document?.body) {
      // Nếu đã init rồi thì bỏ qua
      if (!(document.body as any)._osInstance) {
        OverlayScrollbars(document.body, {
          scrollbars: {
            autoHide: 'leave',
          },
        });
      }
    }
  }, []);

  return null; // Không render gì cả, chỉ để init
}
