'use client';
import { ImgHTMLAttributes } from 'react';
import { Avatar, AvatarProps } from '@mui/material';

export interface ForwardImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  asMuiAvatar?: boolean;
  /**
   * by `px`
   * */
  size?: number;
}

export const ForwardImg: FCC<ForwardImgProps> = ({ src, alt, asMuiAvatar = false, size, ...props }) => {
  const path = `http://localhost:3000/${src}`;
  if (asMuiAvatar) {
    return <Avatar sx={{ width: size, height: size }} src={path} {...(props as AvatarProps)} />;
  }
  return (
    <img
      alt={alt}
      style={size ? { width: `${size}px`, height: `${size}px` } : {}}
      src={path}
      {...(props as ImgHTMLAttributes<HTMLImageElement>)}
    />
  );
};
