'use client';
import { zAuthStore, zToastStore } from '@client/z-state';
import { useEffect, useState } from 'react';
import { ButtonBase, Dialog, Tooltip } from '@mui/material';
import { SvgClient } from '@components';
import {
  Channel,
  RegisterChannelReqBody,
  RegisterChannelResponse,
  ResponseBase,
  SettingInfoRequestBody,
} from '@shop/type';
import { httpResource } from '@core/http';
import { HttpClient } from '@client/utils';
import Link from 'next/link';
import ConfirmProDialog from './component/confirm-pro';
import EditUserInfo from './component/edit-info';

export interface SettingInfoPageProps {}

const SettingChanelPage: FCC<SettingInfoPageProps> = () => {
  const { user, setUser } = zAuthStore();
  const { showToast } = zToastStore();
  const [openPro, setOpenPro] = useState(false);
  const [channel, setChannel] = useState<Channel>();

  const [loading, setLoading] = useState(false);
  const [asyncError, setAsyncError] = useState<any>();
  useEffect(() => {
    httpResource<ResponseBase<Channel>>(HttpClient.get(`user/setting`)).subscribe({
      next(res) {
        setChannel(res.data);
      },
    });
  }, []);
  const closeDialog = () => {
    setOpenPro(false);
  };

  const updateChannel = (data: SettingInfoRequestBody) => {
    setLoading(true);
    httpResource(HttpClient.put<ResponseBase<{}>>(`user/setting-info`, data)).subscribe({
      next(res) {
        showToast({
          type: 'success',
          msg: res.message,
        });
        setUser({ channel: data.channel });
      },
      completed() {
        setLoading(false);
      },
      error(err) {
        showToast({
          type: 'error',
          msg: err.message,
        });
        setAsyncError(err.data);
      },
    });
  };

  const handleRegisterPro = async (value: RegisterChannelReqBody) => {
    setLoading(true);
    httpResource(HttpClient.post<ResponseBase<RegisterChannelResponse>>(`/user/channel`, value)).subscribe({
      next({ data: { channel, verified, channelRef }, message }) {
        showToast({
          type: 'success',
          msg: message,
        });

        user &&
          setUser({
            ...user,
            verified,
            channel,
          });
        setChannel(channelRef);
        httpResource(
          HttpClient.put<ResponseBase>(`user/setting-info`, {
            description: '',
            externalLinks: [],
            channel,
          })
        ).subscribe({
          next() {
            closeDialog();
          },
          completed() {
            setLoading(false);
          },
        });
      },
      error(err) {
        showToast({
          type: 'error',
          msg: err.message,
        });
      },
    });
  };

  return (
    <>
      <Dialog open={openPro} onClose={closeDialog}>
        <ConfirmProDialog onSave={handleRegisterPro} onClose={closeDialog} />
      </Dialog>
      <div className="w-1/3 sticky top-[94px] rounded-tl-xl rounded-bl-xl">
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
              <small className="">Kênh của bạn</small>
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
          &nbsp;
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
