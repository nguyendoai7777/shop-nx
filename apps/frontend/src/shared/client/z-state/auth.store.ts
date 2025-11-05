import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RSBUser } from '@shop/type';

interface AuthStore {
  error: string;
  loading: boolean;
  setLoading(state: boolean): void;
  setError(error: string): void;
  user: RSBUser | undefined;
  setUser(user: Partial<RSBUser> | undefined): void;
  apiUrl: string;
  setApiUrl(url: string): void;
  clearError: () => void;
}

export const zAuthStore = create<AuthStore>()((set, get) => ({
  error: '',
  loading: false,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  user: void 0,
  setUser: (state) => {
    const prv = get().user;
    set({
      // @ts-ignore
      user: state ? { ...prv, ...state } : undefined,
    });
  },
  apiUrl: '',
  setApiUrl: (apiUrl) => set({ apiUrl }),
  clearError: () => set({ error: '' }),
}));
