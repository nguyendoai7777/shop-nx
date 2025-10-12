'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useStore } from 'zustand/react';
import { Button, DialogTitle } from '@mui/material';
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import { AuthDialogProps, LoginFormDto, RegisterFormDto } from '@types';
import { useAuth } from '../auth-context/auth-context';
import { Login } from '../login/login';
import { Register } from '../register/register';
import { zAuthStore } from '@client/z-state';
import { ESoraScrollDistance, useSoraScrollbar } from '@client/hooks';
import { DialogFooter } from 'next/dist/client/components/react-dev-overlay/ui/components/dialog';

const AuthDialog: FCC<AuthDialogProps> = ({ onClose, isRegister = false }) => {
  const scrollRef = useRef<OverlayScrollbarsComponentRef>(null);
  const { login, register, loading } = useAuth();
  const { error } = useStore(zAuthStore, (state) => state);
  const { scrollPosition, handleScroll } = useSoraScrollbar();

  const [isLogin, setIsLogin] = useState(!isRegister);
  const [registerValue, setRegisterValue] = useState<RegisterFormDto>();
  const [loginValue, setLoginValue] = useState<LoginFormDto>();

  const _exeLogin = async () => {
    const data = await login(loginValue!);
    if (data.user) {
      onClose?.();
    }
  };

  const _exeRegister = async () => {
    const res = await register(registerValue!);
    if (res.data) {
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

  const LabelMode = useCallback(() => {
    return <>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</>;
  }, []);

  return (
    <>
      <DialogTitle className="text-white text-lg font-semibold mb-6 text-center">
        <LabelMode />
      </DialogTitle>

      <OverlayScrollbarsComponent
        ref={scrollRef}
        defer
        className="px-6 pb-4 sora-scrollbar"
        options={{}}
        events={{
          scroll: handleScroll,
          initialized: handleScroll,
          updated: handleScroll,
        }}
        {...(scrollPosition === ESoraScrollDistance.Top && { 'at-start': '' })}
        {...(scrollPosition === ESoraScrollDistance.Bottom && { 'at-end': '' })}
        {...(scrollPosition === ESoraScrollDistance.None && { 'at-none': '' })}
      >
        <div className="flex flex-col gap-y-5 w-120 py-2" id="AuthForm">
          {isLogin ? <Login valueChange={setLoginValue} /> : <Register valueChange={setRegisterValue} />}
        </div>
      </OverlayScrollbarsComponent>

      <DialogFooter className="px-6">
        <div className="flex flex-col gap-3">
          <div className="py-1 text-sm text-[#ff2929] min-h-4 h-4 leading-4">{error}</div>
          <Button
            loading={loading}
            fullWidth
            loadingPosition="start"
            type="submit"
            variant="text"
            onClick={handleSubmit}
            className="!bg-pink-800/90 hover:!bg-pink-800 disabled:!text-gray-400 disabled:!bg-gray-700 disbled:!cursor-not-allowed "
          >
            <LabelMode />
          </Button>
          <Button
            variant="text"
            fullWidth
            type="button"
            onClick={() => onClose?.()}
            className="!bg-gray-300/10 hover:!bg-gray-300/25"
          >
            Đóng
          </Button>
        </div>
        <div className="flex items-center text-white mt-2 pb-4 text-sm justify-center">
          {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
          &nbsp;
          <button
            type="button"
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            <LabelMode />
          </button>
        </div>
      </DialogFooter>
    </>
  );
};

export default AuthDialog;
