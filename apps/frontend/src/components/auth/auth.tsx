'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Button, DialogTitle } from '@mui/material';
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import { AuthDialogProps, LoginFormDto, RegisterFormDto } from '@types';
import { useAuth } from '../auth-context/auth-context';
import { Login } from '../login/login';
import { Register } from '../register/register';
import { zAuthStore, zToastStore } from '@client/z-state';
import { ESoraScrollDistance, useSoraScrollbar } from '@client/hooks';

const AuthDialog: FCC<AuthDialogProps> = ({ onClose, isRegister = false }) => {
  const scrollRef = useRef<OverlayScrollbarsComponentRef>(null);
  const { showToast } = zToastStore();

  const { login, register, loading } = useAuth();
  const { error } = zAuthStore();
  const { scrollPosition, handleScroll } = useSoraScrollbar();

  const [isLogin, setIsLogin] = useState(!isRegister);
  const [registerValue, setRegisterValue] = useState<RegisterFormDto>();
  const [loginValue, setLoginValue] = useState<LoginFormDto>();

  const _exeLogin = async () => {
    console.log(loginValue);
    const data = await login(loginValue!);
    if (data.data?.user) {
      onClose?.();
    }
  };

  const _exeRegister = async () => {
    console.log(registerValue);
    const data = await register(registerValue!);
    if (data.data) {
      onClose?.();
      showToast({
        type: 'success',
        msg: data.message + ', đăng nhập nhé!',
      });
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
        className="px-6 sora-scrollbar"
        events={{
          scroll: handleScroll,
          initialized: handleScroll,
          updated: handleScroll,
        }}
        options={{
          overflow: {
            x: 'hidden',
          },
        }}
        {...(scrollPosition === ESoraScrollDistance.Top && { 'at-start': '' })}
        {...(scrollPosition === ESoraScrollDistance.Bottom && { 'at-end': '' })}
        {...(scrollPosition === ESoraScrollDistance.None && { 'at-none': '' })}
      >
        <div className="flex flex-col gap-y-4 pt-2" id="AuthForm">
          {isLogin ? <Login valueChange={setLoginValue} /> : <Register valueChange={setRegisterValue} />}
        </div>
      </OverlayScrollbarsComponent>

      <div className="px-6">
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
      </div>
    </>
  );
};

export default AuthDialog;
