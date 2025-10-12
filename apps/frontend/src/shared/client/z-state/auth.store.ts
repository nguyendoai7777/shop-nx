import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserQueryResponseSchema } from '@shop/type';

interface AuthStore {
  error: string;
  setError(error: string): void;
  user: UserQueryResponseSchema | undefined;
  setUser(user: UserQueryResponseSchema | undefined): void;
  clearError: () => void;
}

export const zAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      error: '',
      setError: (error) => set({ error }),
      user: void 0,
      setUser: (user) => set({ user }),

      clearError: () => set({ error: '' }),
    }),
    {
      name: 'auth-store', // key trong localStorage
    }
  )
);
