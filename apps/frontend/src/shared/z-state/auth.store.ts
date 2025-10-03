import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RegisterFormDto } from '@types';

interface AuthStore {
  error: string;
  setError(error: string): void;
  user: RegisterFormDto | undefined;
  setUser(user: RegisterFormDto | undefined): void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
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
