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
import { Button } from '@mui/material';

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

  const LabelMode = () => {
    return <>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</>;
  };

  return createPortal(
    <>
      <div
        onClick={(ev) => onClose?.()}
        className="fixed inset-0 z-[101] flex items-center justify-center min-h-screen bg-gray-900/60"
      >
        <div
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-120"
          {...StopPropagation}
        >
          <h2 className="text-white text-lg font-semibold mb-6 text-center">
            <LabelMode />
          </h2>

          <div className="flex flex-col gap-y-4" id="AuthForm">
            {isLogin ? (
              <Login valueChange={setLoginValue} />
            ) : (
              <Register valueChange={setRegisterValue} />
            )}

            <div className="text-sm text-[#ff2929] min-h-4 h-4 leading-4">
              {error}
            </div>

            <div className="flex flex-col gap-3">
              <Button type="submit" variant="contained" onClick={handleSubmit}>
                <LabelMode />
              </Button>

              {/* Cancel button */}
              <Button
                type="button"
                onClick={() => onClose?.()}
                className="!bg-gray-700 !px-6 hover:!bg-gray-600 !text-white"
              >
                Đóng
              </Button>
            </div>
          </div>

          {/* Switch link */}
          <p className="mt-4 text-center text-sm text-gray-400">
            {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
            <button
              type="button"
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              <LabelMode />
            </button>
          </p>
        </div>
      </div>
    </>,
    document.body
  );
};

export default AuthDialog;
