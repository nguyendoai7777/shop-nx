'use client';
import { ImgHTMLAttributes, useEffect, useState } from 'react';
import { Avatar, AvatarProps, Skeleton } from '@mui/material';
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
  const [url, setUrl] = useState('');
  useEffect(() => {
    (async () => {
      const api = await ClientConfiguration.get('api');
      setUrl(`${api}/${src}`);
    })();
  }, []);
  if (asMuiAvatar) {
    return <Avatar alt={alt} sx={{ width: size, height: size }} src={url} {...(props as AvatarProps)} />;
  }
  return url ? (
    <img
      alt={alt}
      style={size ? { width: `${size}px`, height: `${size}px` } : {}}
      src={url}
      {...(props as ImgHTMLAttributes<HTMLImageElement>)}
    />
  ) : (
    <Skeleton variant="circular" />
  );
};
