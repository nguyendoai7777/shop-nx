'use client';

import { createContext, useContext } from 'react';
import { AuthContextType } from '@types';
import { useAuthContextHook } from './auth-context.hooks';

const AuthContext = createContext<AuthContextType>();

export const AuthContextProvider: FCC = ({ children }) => {
  const { register, logout, login, loading, setLoading } = useAuthContextHook();
  return (
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
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
