import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserQueryResponseSchema } from '@shop/type';

interface AuthStore {
  error: string;
  setError(error: string): void;
  user: UserQueryResponseSchema | undefined;
  setUser(user: Partial<UserQueryResponseSchema> | undefined): void;
  clearError: () => void;
}

export const zAuthStore = create<AuthStore>()((set, get) => ({
  error: '',
  setError: (error) => set({ error }),
  user: void 0,
  setUser: (state) => {
    const prv = get().user;
    set({
      // @ts-ignore
      user: state ? { ...prv, ...state } : undefined,
    });
  },

  clearError: () => set({ error: '' }),
}));
