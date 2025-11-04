'use client';

import { createContext, Suspense, useContext } from 'react';
import type { AuthContextType } from '@types';
import { useAuthContextHook } from './auth-context.hooks';

const AuthContext = createContext<AuthContextType>();

export const AuthContextProvider: FCC = ({ children }) => {
  const { register, logout, login, loading, setLoading } = useAuthContextHook();
  return (
    <Suspense fallback={<>Loading...</>}>
      <AuthContext
        value={{
          loading,
          login,
          logout,
          register,
          setLoading,
        }}
      >
        {children}
      </AuthContext>
    </Suspense>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
