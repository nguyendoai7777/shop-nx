'use client';

import { createPortal } from 'react-dom';
import { FormEvent, useEffect, useState } from 'react';
import { AuthDialogProps, LoginFormDto, RegisterFormDto } from '@types';
import { StopPropagation } from '@directives';
import { useAuth } from '../auth-context/auth-context';
import { Login } from '../login/login';
import { Register } from '../register/register';
import { useAuthStore } from '@z-state';
import { useStore } from 'zustand/react';

const AuthDialog: FCC<AuthDialogProps> = ({ onClose, isRegister = false }) => {
  const { login, register } = useAuth();
  const { error } = useStore(useAuthStore, (state) => state);

  const [isLogin, setIsLogin] = useState(true);
  const [registerValue, setRegisterValue] = useState<RegisterFormDto>();
  const [loginValue, setLoginValue] = useState<LoginFormDto>();

  const _exeLogin = async () => {
    const data = await login(loginValue!);
    if (data.data) {
      onClose?.();
    }
  };

  const _exeRegister = async () => {
    const data = await register(registerValue!);
    if (data.data) {
      onClose?.();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    void (isLogin ? _exeLogin() : _exeRegister());
  };

  useEffect(() => {
    setIsLogin(!isRegister);
  }, []);

  return createPortal(
    <>
      <div
        onClick={(ev) => onClose?.()}
        className="fixed inset-0 flex items-center justify-center min-h-screen bg-gray-900/60"
      >
        <div
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-80"
          {...StopPropagation}
        >
          <h2 className="text-white text-lg font-semibold mb-4">
            {isLogin ? 'Login' : 'Register'}
          </h2>

          <div className="space-y-4" id="AuthForm">
            {isLogin ? (
              <Login valueChange={setLoginValue} />
            ) : (
              <Register valueChange={setRegisterValue} />
            )}

            <div className="text-sm text-red-500 min-h-3.5 h-3.5">{error}</div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-2 bg-blue-600 text-white rounded hover:brightness-110 transition duration-200"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>

            {/* Cancel button */}
            <button
              type="button"
              onClick={() => onClose?.()}
              className="w-full py-2 text-gray-400 hover:text-gray-200 transition duration-200"
            >
              Cancel
            </button>
          </div>

          {/* Switch link */}
          <p className="mt-4 text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className="text-blue-400 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </>,
    document.body
  );
};

export default AuthDialog;
