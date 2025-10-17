'use client';
import { useMemo } from 'react';
import { UserQueryResponseSchema } from '@shop/type';
import { ForwardImg } from '@components';

export interface NavAvatarProps {
  user: UserQueryResponseSchema;
}

const NavAvatar: FCC<NavAvatarProps> = ({ user }) => {
  const { avatar, firstname = '', lastname = '' } = user;
  const naming = useMemo(() => {
    return {
      short: (firstname.charAt(0) + lastname.charAt(0)!).replace(/\s/, '').toUpperCase(),
      full: firstname + ' ' + lastname,
    };
  }, [firstname, lastname]);

  return avatar ? (
    <ForwardImg alt={naming.short} src={avatar} asMuiAvatar />
  ) : (
    <div className="w-9 h-9 rounded-full text-center content-center border border-gray-400 ">{naming.short}</div>
  );
};

export default NavAvatar;
