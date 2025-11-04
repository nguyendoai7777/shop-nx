'use client';
import { ImgHTMLAttributes, useEffect } from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import { ClientConfiguration } from '@client/utils';

export interface ForwardImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  asMuiAvatar?: boolean;
  /**
   * by `px`
   * */
  size?: string;
}

export const ForwardImg: FCC<ForwardImgProps> = ({ src, alt, asMuiAvatar = false, size, ...props }) => {
  const path = `http://localhost:3000/${src}`;
  if (asMuiAvatar) {
    return <Avatar alt={alt} sx={{ width: size, height: size }} src={path} {...(props as AvatarProps)} />;
  }
  useEffect(() => {
    const v = async () => {
      const xv = await ClientConfiguration.get('api');
      console.log({ xv });
    };
    v();
  }, []);
  return (
    <img
      alt={alt}
      style={size ? { width: `${size}px`, height: `${size}px` } : {}}
      src={path}
      {...(props as ImgHTMLAttributes<HTMLImageElement>)}
    />
  );
};
