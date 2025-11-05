import { useEffect, useState } from 'react';
import { httpResource } from '@core/http';
import {
  Channel,
  RegisterChannelReqBody,
  RegisterChannelResponse,
  ResponseBase,
  SettingInfoRequestBody,
} from '@shop/type';
import { HttpClient } from '@client/utils';
import { zAuthStore, zToastStore } from '@client/z-state';

export const settingChannelService = () => {
  const { user, setUser } = zAuthStore();
  const { showToast } = zToastStore();
  const [openPro, setOpenPro] = useState(false);
  const [channel, setChannel] = useState<Channel>();

  const [loading, setLoading] = useState(false);
  const [asyncError, setAsyncError] = useState<any>();
  useEffect(() => {
    httpResource<ResponseBase<Channel>>(HttpClient.get(`user/setting-channel`)).subscribe({
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
    httpResource(HttpClient.put<ResponseBase<{}>>(`/user/setting-channel`, data)).subscribe({
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
          HttpClient.put<ResponseBase>(`user/setting-channel`, {
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
  return {
    openPro,
    channel,
    loading,
    asyncError,
    updateChannel,
    handleRegisterPro,
    setOpenPro,
    closeDialog,
  };
};
