'use client';
import { RegisterFormDto } from '@types';
import { Avatar } from '@mui/material';
import { useMemo } from 'react';
import { UserQueryResponseSchema } from '@shop/type';

interface __User extends UserQueryResponseSchema {
  avatar?: string;
}

export interface NavAvatarProps {
  user: __User;
}

const NavAvatar: FCC<NavAvatarProps> = (props) => {
  const { avatar, firstname = '', lastname = '', username, email } = props.user;
  const naming = useMemo(() => {
    return {
      short: (firstname.charAt(0) + lastname.charAt(0)!).toUpperCase(),
      full: firstname + ' ' + lastname,
    };
  }, [firstname, lastname]);

  return avatar ? (
    <Avatar alt={naming.full} src={avatar} />
  ) : (
    <div className="w-9 h-9 rounded-full text-center content-center border border-gray-400 ">{naming.short}</div>
  );
};

export default NavAvatar;
