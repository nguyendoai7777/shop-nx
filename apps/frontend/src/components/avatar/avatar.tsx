'use client';
import { useMemo } from 'react';
import { RSBUserBase } from '@shop/type';
import { ForwardImg } from '@components';

export interface XAvatarProps {
  user: RSBUserBase;
  asMuiAvatar?: boolean;
  avatarSize?: string;
}

export const XAvatar: FCC<XAvatarProps> = ({
  user,
  avatarSize,
  asMuiAvatar = true,
  className = 'w-10 h-10 min-w-10 min-h-10',
}) => {
  const { avatar, firstname = '', lastname = '' } = user;
  const naming = useMemo(() => {
    return {
      short: (firstname.charAt(0) + lastname.charAt(0)!).replace(/\s/, '').toUpperCase(),
      full: firstname + ' ' + lastname,
    };
  }, [firstname, lastname]);
  return avatar ? (
    <ForwardImg alt={naming.short} size={avatarSize} src={avatar} asMuiAvatar={asMuiAvatar} />
  ) : (
    <div className={`${className} rounded-full text-center content-center border border-gray-400 `}>{naming.short}</div>
  );
};

export default XAvatar;
