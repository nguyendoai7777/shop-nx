/*
'use client';
import { ChangeEvent, useRef, useState } from 'react';
import { zAuthStore, zToastStore } from '@client/z-state';
import { MediaImagAllowedMsg, MediaImageMimes } from '@shop/platform';
import { httpResource } from '@core/http';
import { HttpClient } from '@client/utils';
import { ResponseBase, UserProfileImage } from '@shop/type';
export interface UpdateUserProfile {
  firstname: string;
  lastname: string;
}
interface UploadFile {
  file: File;
  preview: string;
}
export interface PickImage {
  avatar?: UploadFile;
  banner?: UploadFile;
}

export interface ImageUploadProps {
  onPick(image: PickImage): void;
}

export const useUpdateProfileService = () => {
  const { setUser } = zAuthStore();
  const { showToast } = zToastStore();

  const input = useRef<HTMLInputElement>();

  const [isBanner, setIsBanner] = useState(false);
  const [banner, setBanner] = useState<UploadFile>();
  const [avatar, setAvatar] = useState<UploadFile>();

  const handleBanner = (isBanner: boolean) => {
    setIsBanner(isBanner);
    input.current.click();
  };

  function flushUrl() {
    const flush = URL.revokeObjectURL;
    if (banner) {
      flush(banner.preview);
    }
    if (avatar) {
      flush(avatar.preview);
    }
  }

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const fs = e.target.files;
    if (fs && fs.length) {
      flushUrl();
      const file = fs.item(0)!;
      if (!MediaImageMimes.includes(file.type)) {
        showToast({ type: 'error', msg: `Chỉ chấp nhận file ảnh (${MediaImagAllowedMsg.toUpperCase()})` });
        return;
      }
      let preview = URL.createObjectURL(file);
      if (isBanner) {
        setBanner({ file, preview });
      } else {
        setAvatar({ file, preview });
      }

      e.target.files = null;
      e.target.value = '';

      /!*onPick({
        banner,
        avatar,
      });*!/
    }
  }

  const handleUploadFile = () => {
    const fd = new FormData();
    if (banner) {
      fd.append('banner', banner.file);
    }
    if (avatar) {
      fd.append('avatar', avatar.file);
    }
    httpResource(
      HttpClient.post<ResponseBase<UserProfileImage>>('/media/upload', fd, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      })
    ).subscribe(({ message, data }) => {
      data.avatar && setUser({ avatar: data.avatar });
      data.banner && setUser({ banner: data.banner });
      showToast({ type: 'success', msg: message });
      console.log(`@@ Updated file`, data);
    });
  };

  return {
    handleUploadFile,
    handleUpload,
    handleBanner,
    banner,
    avatar,
    isBanner,
    input,
  };
};
*/
