'use client';
import { useMemo } from 'react';
import { RSBDonor } from '@shop/type';
import { ForwardImg } from '@components';

export interface XAvatarProps {
  user: RSBDonor;
  size?: string;
}

export const XAvatar: FCC<XAvatarProps> = ({ user, size }) => {
  const { avatar, firstname = '', lastname = '' } = user;
  const naming = useMemo(() => {
    return {
      short: (firstname.charAt(0) + lastname.charAt(0)!).replace(/\s/, '').toUpperCase(),
      full: firstname + ' ' + lastname,
    };
  }, [firstname, lastname]);
  const _size = size ?? 'w-10 h-10 min-w-10 min-h-10';
  return avatar ? (
    <ForwardImg alt={naming.short} src={avatar} asMuiAvatar />
  ) : (
    <div className={`${_size} rounded-full text-center content-center border border-gray-400 `}>{naming.short}</div>
  );
};

export default XAvatar;
