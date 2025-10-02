'use client';

import { useEffect } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';

export function BodyScrollbarInitializer() {
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