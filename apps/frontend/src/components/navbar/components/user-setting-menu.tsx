'use client';
import { Button, Menu } from '@mui/material';
// import SettingsIcon from '@mui/icons-material/Settings';
import { Settings, Person, Logout } from '@mui/icons-material';
import Link from 'next/link';
export interface UserSettingMenuProps {
  id: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose(e: RMouseEvent<HTMLElement>): void;
  logout(): void;
}

const UserSettingMenu: FCC<UserSettingMenuProps> = ({
  id,
  anchorEl,
  open,
  handleClose,
  logout,
}) => {
  const _className =
    '!justify-start !text-white hover:!bg-white/10 !px-4 !rounded-none';
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
      <li>
        <Link href="/profile">
          <Button fullWidth className={_className} startIcon={<Person />}>
            Hồ sơ
          </Button>
        </Link>
      </li>
      <li>
        <Link href="/setting">
          <Button fullWidth className={_className} startIcon={<Settings />}>
            Cài đặt
          </Button>
        </Link>
      </li>
      <li>
        <Link href="/">
          <Button
            fullWidth
            className={_className}
            startIcon={<Logout />}
            onClick={logout}
          >
            Đăng xuất
          </Button>
        </Link>
      </li>
    </Menu>
  );
};

export default UserSettingMenu;
