import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// the store itself does not need any change

interface AuthStore {
  error: string;
  setError: (error: string) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      error: '',
      setError: (error) => set({ error }),
      clearError: () => set({ error: '' }),
    }),
    {
      name: 'auth-store', // key trong localStorage
    }
  )
);
