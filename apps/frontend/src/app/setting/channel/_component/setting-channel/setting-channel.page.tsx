'use client';
import { zAuthStore } from '@client/z-state';
import { ButtonBase, Dialog, Tooltip } from '@mui/material';
import { SvgClient } from '@components';
import Link from 'next/link';
import ConfirmProDialog from '../confirm-pro';
import EditUserInfo from '../edit-info';
import { settingChannelService } from './setting-channel.service';
import { React } from 'next/dist/server/route-modules/app-page/vendored/ssr/entrypoints';

export interface SettingInfoPageProps {}

const SettingChanelPage: FCC<SettingInfoPageProps> = () => {
  const { user } = zAuthStore();
  const { openPro, channel, loading, asyncError, updateChannel, handleRegisterPro, setOpenPro, closeDialog } =
    settingChannelService();

  return (
    <>
      <Dialog open={openPro} onClose={closeDialog}>
        <ConfirmProDialog onSave={handleRegisterPro} onClose={closeDialog} />
      </Dialog>
      <div className="md:w-1/3 md:sticky top-[94px] rounded-tl-xl rounded-bl-xl flex md:flex-col items-center gap-3 md:gap-0">
        <div className="h-12 text-2xl flex items-center gap-3">
          <div onClick={() => setOpenPro(true)}>Pro</div>
          {user?.verified ? (
            <Tooltip title="Verified" placement="top">
              <div className="">
                <SvgClient
                  className={`${user?.verified ? 'text-purple-400' : 'text-gray-400'} !w-3 !h-3`}
                  href="Verified"
                />
              </div>
            </Tooltip>
          ) : (
            <></>
          )}
        </div>
        <div>
          {user?.verified ? (
            <div className="flex items-center gap-2">
              <small className="invisible md:visible w-0 md:w-auto">Kênh của bạn</small>
              <Link href={`/streamers/@${user.channel}`}>
                <small className="duration-150 rounded underline text-gray-400 hover:text-pink-500">
                  /streamer/@{user.channel}
                </small>
              </Link>
            </div>
          ) : (
            <>
              <ButtonBase className="!rounded btn-base" onClick={() => setOpenPro(true)}>
                <div className="px-2 text-sm">Kích hoạt kênh</div>
              </ButtonBase>
              <small className="rounded underline text-gray-400">/streamer/@channel</small>
            </>
          )}
        </div>
      </div>
      {user?.verified && channel ? (
        <EditUserInfo
          asyncError={asyncError}
          loading={loading}
          channelName={user.channel ?? ''}
          channel={channel}
          save={updateChannel}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SettingChanelPage;
