'use client';

import { createContext, useContext } from 'react';
import { AuthContextType } from '@types';
import { Snackbar } from '@mui/material';
import { useAuthContextHook } from './auth-context.hooks';

const AuthContext = createContext<AuthContextType>();

export const AuthContextProvider: FCC = ({ children }) => {
  const { register, logout, login, setToastMsg, loading, toastMsg, setLoading } = useAuthContextHook();

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={!!toastMsg}
        autoHideDuration={5000}
        message={toastMsg}
        onClose={() => {
          setToastMsg('');
        }}
      />
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
    </>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
