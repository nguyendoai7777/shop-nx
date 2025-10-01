'use client';
import { Button, Menu } from '@mui/material';
import { lazy, useState } from 'react';

export interface UserSettingMenuProps {
  id: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose(e: RMouseEvent<HTMLElement>): void;
}

const UserSettingMenu: FCC<UserSettingMenuProps> = ({
  id,
  anchorEl,
  open,
  handleClose,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id={id}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
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
      <Button>Cập nhật thông tin</Button>
      <Button>Cài đặt</Button>
      <Button>Đăng xuất</Button>
    </Menu>
  );
};

export default UserSettingMenu;
