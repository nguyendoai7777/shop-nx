'use client';
import { Button, Menu } from '@mui/material';
import { Logout, Person, Settings } from '@mui/icons-material';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useStore } from 'zustand/react';
import { zAuthStore } from '@client/z-state';

export interface UserSettingMenuProps {
  id: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose(e: RMouseEvent<HTMLElement>): void;
  logout(): void;
}

const UserSettingMenu: FCC<UserSettingMenuProps> = ({ id, anchorEl, open, handleClose, logout }) => {
  const { user } = useStore(zAuthStore, (state) => state);
  const _className = '!justify-start !text-white hover:!bg-white/10 !px-4 !rounded-none';

  return (
    <Menu
      anchorEl={anchorEl}
      id={id}
      open={open}
      onClose={handleClose}
      disableRestoreFocus
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <li className="px-4 text-xs text-gray-400 pb-2">{user?.email}</li>
      <li className="px-4 text-xs text-gray-400 pb-2 border-b border-gray-400/30">
        {user?.firstname} {user?.lastname}
      </li>
      <li onClick={handleClose}>
        <Link href="/user">
          <Button fullWidth className={_className} startIcon={<Person />}>
            Hồ sơ
          </Button>
        </Link>
      </li>
      <li onClick={handleClose}>
        <Link href="/setting">
          <Button fullWidth className={_className} startIcon={<Settings />}>
            Cài đặt
          </Button>
        </Link>
      </li>
      <li onClick={handleClose}>
        <Button fullWidth className={_className} startIcon={<Logout />} onClick={logout}>
          Đăng xuất
        </Button>
      </li>
    </Menu>
  );
};

export default UserSettingMenu;
