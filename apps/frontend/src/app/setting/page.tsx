'use client';
import { SvgClient } from '@components';
import { Tooltip } from '@mui/material';

export default function SettingPage() {
  return (
    <div className="flex flex-1">
      <div className="w-1/3  rounded-tl-xl rounded-bl-xl">
        <div className="h-12 text-2xl flex items-center gap-3">
          Pro
          <Tooltip title="Verified" placement="top">
            <div className="">
              <SvgClient className="text-purple-400 !w-3 !h-3" href="Verified" />
            </div>
          </Tooltip>
          {/*<Image src="/avatar.webp" alt="avatar" width={48} height={48} />*/}
        </div>
        <div>
          Kích hoạt kênh &nbsp;
          <small className="rounded bg-gray-300/10 px-1 text-gray-400">dnx.dn/@username</small>
          &nbsp;/&nbsp;
          <small className="rounded bg-gray-300/10 px-1 text-gray-400">dnx.dn/@channel</small>
        </div>
      </div>
      <div className="flex-1 bg-blue-600">
        <div className="banner">1</div>
      </div>
    </div>
  );
}
