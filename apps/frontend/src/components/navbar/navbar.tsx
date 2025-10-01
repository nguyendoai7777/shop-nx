'use client';

import { lazy, useState } from 'react';
import { useAuth } from '../auth-context/auth-context';
import AuthDialog from '../auth/auth';
import { Button } from '@mui/material';
import NavAvatar from './components/nav-avatar';
const UserSettingMenu = lazy(() => import('./components/user-setting-menu'));
export default function Navbar() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleAuthMode = (register: boolean) => {
    setShowLogin(true);
    setIsRegisterMode(register);
  };
  const MenuAnchorId = '123123';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: RMouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    (document.activeElement as HTMLElement)?.blur();
  };
  return (
    <>
      <UserSettingMenu
        id={MenuAnchorId}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
      <nav className="flex items-center mx-6 p-4 justify-between rounded-full sticky top-6 z-100 bg-[#63636336] !backdrop-blur-[5px] !backdrop-saturate-[1]">
        <div className="font-bold">DonateApp</div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div id={MenuAnchorId} onClick={handleClick}>
                <NavAvatar user={user} />
              </div>
              <Button
                onClick={logout}
                className="!rounded-full !bg-gray-700 !px-6 hover:!bg-gray-600 !text-white"
              >
                Đăng xuất
              </Button>
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
      {showLogin && (
        <AuthDialog
          isRegister={isRegisterMode}
          onClose={() => setShowLogin(false)}
        />
      )}
    </>
  );
}
