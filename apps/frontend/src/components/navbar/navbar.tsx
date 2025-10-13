'use client';

import { useState } from 'react';
import { useAuth } from '../auth-context/auth-context';
import AuthDialog from '../auth/auth';
import { Button, Dialog } from '@mui/material';
import NavAvatar from './components/nav-avatar';
import dynamic from 'next/dynamic';
import { zAuthStore, zToastStore } from '@client/z-state';
import Link from 'next/link';

const UserSettingMenu = dynamic(() => import('./components/user-setting-menu'), { ssr: false });

const MenuAnchorId = crypto.randomUUID();

export default function Navbar() {
  const { closeToast } = zToastStore();
  const { user, clearError } = zAuthStore();
  const { setLoading } = useAuth();
  const { logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleAuthMode = (register: boolean) => {
    setShowLogin(true);
    setIsRegisterMode(register);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: RMouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    (document.activeElement as HTMLElement)?.blur();
    setAnchorEl(null);
  };

  const destroyDialog = () => {
    setShowLogin(false);
    setLoading(false);
    closeToast();
    clearError();
  };
  return (
    <>
      {open ? (
        <UserSettingMenu id={MenuAnchorId} anchorEl={anchorEl} open={open} handleClose={handleClose} logout={logout} />
      ) : (
        <></>
      )}
      <div className="sticky top-0 z-100">
        <div className="h-6 bg-dark"></div>
        <nav className="flex gap-x-2 items-center p-2 rounded-full bg-[#63636336] !backdrop-blur-[5px] !backdrop-saturate-[1]">
          <Link href="/" className="font-bold cursor-pointer">
            DonateApp
          </Link>
          <Link href="/streamers" className="font-bold cursor-pointer">
            Streamer
          </Link>
          <div className="ml-auto flex items-center gap-3">
            {user ? (
              <>
                <div id={MenuAnchorId} onClick={handleClick} className="cursor-pointer">
                  <NavAvatar user={user} />
                </div>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleAuthMode(false)}
                  className="!rounded-full !bg-gray-700 !px-6 hover:!bg-gray-600 !text-white"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => handleAuthMode(true)}
                  className="!rounded-full !bg-gray-700 !px-6 hover:!bg-gray-600 !text-white"
                >
                  Đăng ký
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
      <Dialog open={showLogin} onClose={destroyDialog}>
        <AuthDialog isRegister={isRegisterMode} onClose={destroyDialog} />
      </Dialog>
    </>
  );
}
