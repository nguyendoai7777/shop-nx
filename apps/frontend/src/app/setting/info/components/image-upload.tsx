'use client';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button, Tooltip } from '@mui/material';
import { zAuthStore, zToastStore } from '@client/z-state';
import { MediaImagAllowedMsg, MediaImageAllowed, MediaImageMimes } from '@shop/platform';
import { ForwardImg } from '@components';
import { ProfileForm } from './profile-form';
import { ChangeEvent, useRef, useState } from 'react';
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

export const ImageUpload: FCC = () => {
  const { user, setUser } = zAuthStore();
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

      /*onPick({
        banner,
        avatar,
      });*/
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
  return (
    <>
      <Button variant="contained" onClick={handleUploadFile}>
        Upload
      </Button>
      <div className="SettingInfoPage relative flex-1 mr-13">
        <div className="relative w-full">
          <div className={`Banner aspect-[16/2.5] bg-gray-300/10 w-full ${banner || user?.banner ? '' : 'opacity-35'}`}>
            {banner ? (
              <img className="absolute top-1/2 left-1/2 -translate-1/2 h-full" alt="banner" src={banner.preview} />
            ) : user?.banner ? (
              <ForwardImg className="absolute top-1/2 left-1/2 -translate-1/2 h-full" alt="banner" src={user.banner} />
            ) : (
              <></>
            )}
          </div>
          <Tooltip title="tải lên" arrow>
            <div
              onClick={() => handleBanner(true)}
              className="cursor-pointer hover:text-white hover:bg-dark/20 text-gray-300 absolute top-1/2 left-1/2 -translate-1/2 p-6 border border-gray-300/10 duration-150 hover:border-gray-300/70 rounded-full"
            >
              <CameraAltIcon className="scale-200 " />
            </div>
          </Tooltip>
        </div>

        <div className="absolute left-12  w-45 h-45 z-20 top-[calc(100%-90px)] bg-dark border-2 border-gray-300  rounded-full overflow-hidden">
          <div className="relative w-full h-full">
            <div className={`Banner h-full w-full ${avatar || user?.avatar ? '' : 'opacity-35'}`}>
              {avatar ? (
                <img className="absolute top-1/2 left-1/2 -translate-1/2 h-full" alt="avatar" src={avatar.preview} />
              ) : user?.avatar ? (
                <ForwardImg
                  className="absolute top-1/2 left-1/2 -translate-1/2 h-full"
                  alt="avatar"
                  src={user.avatar}
                />
              ) : (
                <></>
              )}
            </div>
            <Tooltip title="tải lên" arrow>
              <div
                onClick={() => handleBanner(false)}
                className="cursor-pointer hover:text-white hover:bg-dark/20 text-gray-300 absolute top-1/2 left-1/2 -translate-1/2 p-6 border border-gray-300/10 duration-150 hover:border-gray-300/70 rounded-full"
              >
                <CameraAltIcon className="scale-200 " />
              </div>
            </Tooltip>
          </div>
        </div>
        <input
          onChange={handleUpload}
          className="hidden"
          type="file"
          accept={MediaImageAllowed}
          ref={input}
          onBlur={(e) => (e.target.files = null)}
        />
      </div>
    </>
  );
};
