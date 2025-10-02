'use client';

import { createContext, ReactNode, useContext } from 'react';
import { AuthContextType } from '@types';
import { Snackbar } from '@mui/material';
import { useAuthContextHook } from './auth-context.hooks';

const AuthContext = createContext<AuthContextType>();

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const {
    register,
    logout,
    login,
    setUser,
    setToastMsg,
    user,
    loading,
    toastMsg,
  } = useAuthContextHook();

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!toastMsg}
        autoHideDuration={5000}
        message={toastMsg}
        onClose={() => {
          setToastMsg('');
        }}
      />
      <AuthContext.Provider
        value={{
          loading,
          user,
          setUser,
          login,
          logout,
          register,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
