'use client';
import { RegisterFormDto } from '@types';
import { Avatar } from '@mui/material';

export interface NavAvatarProps extends Omit<RegisterFormDto, 'password'> {
  avatar?: string;
}

const NavAvatar = (user: { user: NavAvatarProps }) => {
  const { avatar, firstname = '', lastname = '', username, email } = user.user;
  const naming = () => {
    return {
      short: (firstname.charAt(0) + lastname.charAt(0)!).toUpperCase(),
      full: firstname + ' ' + lastname,
    };
  };
  return avatar ? (
    <Avatar alt={naming().full} src={avatar} />
  ) : (
    <div className="w-9 h-9 rounded-full text-center content-center border border-gray-400 ">
      {naming().short}
    </div>
  );
};

export default NavAvatar;
