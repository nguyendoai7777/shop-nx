'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { AuthDialogProps, LoginFormDto, RegisterFormDto } from '@types';
import { useAuth } from '../auth-context/auth-context';
import { Login } from '../login/login';
import { Register } from '../register/register';
import { useAuthStore } from '@z-state';
import { useStore } from 'zustand/react';
import { Button, DialogTitle } from '@mui/material';
import { DialogFooter } from 'next/dist/client/components/react-dev-overlay/ui/components/dialog';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import type { OverlayScrollbars } from 'overlayscrollbars';
// import type { OverlayScrollbars } from 'overlayscrollbars';

const AuthDialog: FCC<AuthDialogProps> = ({ onClose, isRegister = false }) => {
  const { login, register, loading } = useAuth();
  const { error } = useStore(useAuthStore, (state) => state);

  const [isLogin, setIsLogin] = useState(isRegister);
  const [registerValue, setRegisterValue] = useState<RegisterFormDto>();
  const [loginValue, setLoginValue] = useState<LoginFormDto>();
  const [scrollShadow, setScrollShadow] = useState<0 | 1 | 2>(0);
  const _exeLogin = async () => {
    const data = await login(loginValue!);
    if (data.data) {
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

  const handleScroll = (instance: OverlayScrollbars, event: Event) => {
    const { viewport } = instance.elements();
    const scrollTop = viewport.scrollTop;
    const scrollHeight = viewport.scrollHeight;
    const clientHeight = viewport.clientHeight;

    const distanceFromTop = scrollTop;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const distance = 20;

    if (distanceFromTop <= distance) {
      setScrollShadow(0);
    } else if (distanceFromBottom <= distance) {
      setScrollShadow(1);
    } else {
      setScrollShadow(2);
    }
  };

  return (
    <>
      <DialogTitle className="text-white text-lg font-semibold mb-6 text-center">
        <LabelMode />
      </DialogTitle>

      <OverlayScrollbarsComponent
        defer
        className="px-6 pb-4 sora-scrollbar"
        options={{}}
        events={{
          scroll: handleScroll,
        }}
        {...(scrollShadow === 0 && { 'at-start': '' })}
        {...(scrollShadow === 1 && { 'at-end': '' })}
      >
        <div className="flex flex-col gap-y-5 w-120 py-2" id="AuthForm">
          {isLogin ? (
            <Login valueChange={setLoginValue} />
          ) : (
            <Register valueChange={setRegisterValue} />
          )}
        </div>
      </OverlayScrollbarsComponent>

      <DialogFooter className="px-6">
        <div className="flex flex-col gap-3">
          <div className="py-1 text-sm text-[#ff2929] min-h-4 h-4 leading-4">
            {error}
          </div>
          <Button
            loading={loading}
            fullWidth
            loadingPosition="start"
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            className="disabled:!text-gray-400 disabled:!bg-gray-700 disbled:!cursor-not-allowed"
          >
            <LabelMode />
          </Button>
          <Button
            fullWidth
            type="button"
            onClick={() => onClose?.()}
            className="!bg-gray-700 !px-6 hover:!bg-gray-600 !text-white"
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
