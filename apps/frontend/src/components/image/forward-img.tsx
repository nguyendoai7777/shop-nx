'use client';
import { ImgHTMLAttributes } from 'react';
import { Avatar, AvatarProps } from '@mui/material';

export interface ForwardImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  asMuiAvatar?: boolean;
}

export const ForwardImg: FCC<ForwardImgProps> = ({ src, alt, asMuiAvatar = false, ...props }) => {
  const path = `http://localhost:3000/${src}`;
  if (asMuiAvatar) {
    return <Avatar src={path} {...(props as AvatarProps)} />;
  }
  return <img alt={alt} src={path} {...(props as ImgHTMLAttributes<HTMLImageElement>)} />;
};
