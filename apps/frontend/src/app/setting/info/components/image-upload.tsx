'use client';
import { ChangeEvent, useRef, useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Tooltip } from '@mui/material';

export interface PickImage {
  avatar?: UploadFile;
  banner?: UploadFile;
}

export interface ImageUploadProps {
  onPick(imgs: PickImage): void;
}

interface UploadFile {
  file: File;
  preview: string;
}
export const ImageUpload: FCC<ImageUploadProps> = ({ onPick }) => {
  const input = useRef<HTMLInputElement>();
  const [isBanner, setIsBanner] = useState(false);
  const [banner, setBanner] = useState<UploadFile>();
  const [avatar, setAvatar] = useState<UploadFile>();
  const handleBanner = (isBanner: boolean) => {
    setIsBanner(isBanner);
    input.current.click();
  };

  function flushUrl() {
    if (banner) {
      URL.revokeObjectURL(banner.preview);
    }
    if (avatar) {
      URL.revokeObjectURL(avatar.preview);
    }
  }

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const fs = e.target.files;
    if (fs && fs.length) {
      flushUrl();

      const file = fs.item(0)!;
      let preview = URL.createObjectURL(file);
      console.log(file);
      if (isBanner) {
        setBanner({ file, preview });
      } else {
        setAvatar({ file, preview });
      }

      e.target.files = null;
      e.target.value = '';

      onPick({
        banner,
        avatar,
      });
    }
  }

  return (
    <div className="SettingInfoPage relative flex-1 mr-13">
      <div className="relative w-full">
        <div className={`Banner aspect-[16/2.5] bg-gray-300/10 w-full ${banner ? '' : 'opacity-35'}`}>
          {banner ? (
            <img className="absolute top-1/2 left-1/2 -translate-1/2 h-full" alt="banner" src={banner.preview} />
          ) : (
            <></>
          )}
          {/*{banner ? <div className="absolute inset-0 bg-center bg-no-repeat h-full" style={{backgroundImage: `url(${banner.preview})`, backgroundSize: 'auto 100%'}}/> : <></>}*/}
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
          <div className={`Banner h-full w-full ${avatar ? '' : 'opacity-35'}`}>
            {avatar ? (
              <img className="absolute top-1/2 left-1/2 -translate-1/2 h-full" alt="banner" src={avatar.preview} />
            ) : (
              <></>
            )}
            {/*{banner ? <div className="absolute inset-0 bg-center bg-no-repeat h-full" style={{backgroundImage: `url(${banner.preview})`, backgroundSize: 'auto 100%'}}/> : <></>}*/}
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
        accept=".png, .jpg, .jpeg, .webp"
        ref={input}
        onBlur={(e) => (e.target.files = null)}
      />
    </div>
  );
};
