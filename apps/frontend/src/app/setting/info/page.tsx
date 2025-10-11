'use client';
import { useStore } from 'zustand/react';
import { zAuthStore } from '@z-state';
import { lazy, useState } from 'react';
import { Alert, AlertColor, ButtonBase, Dialog, Snackbar, Tooltip } from '@mui/material';
import { SvgClient } from '@components';
const EditUserInfo = lazy(() => import('../component/edit-info'));
// import ConfirmProDialog from '../component/confirm-pro';
const ConfirmProDialog = lazy(() => import('../component/confirm-pro'));

export interface SettingInfoPageProps {}

const SettingInfoPagePage: FCC<SettingInfoPageProps> = () => {
  const { user } = useStore(zAuthStore, (state) => state);
  const [openPro, setOpenPro] = useState(false);

  const closeDialog = () => {
    setOpenPro(false);
  };
  const [msg, setMsg] = useState({
    type: 'success' as AlertColor,
    msg: '',
  });

  const [openAlert, setOpenAlert] = useState(false);
  return (
    <>
      <div className="flex flex-1">
        <div className="w-1/3  rounded-tl-xl rounded-bl-xl">
          <div className="h-12 text-2xl flex items-center gap-3">
            Pro
            {user?.verified ? (
              <Tooltip title="Verified" placement="top">
                <div className="">
                  <SvgClient className={`${user?.verified ? 'text-purple-400' : 'text-gray-400'} !w-3 !h-3`} href="Verified" />
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
                <small className="rounded underline text-gray-400">/streamer/{user.channel}</small>
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
        {user?.verified ? <EditUserInfo /> : <></>}
      </div>
      <Dialog open={openPro} onClose={closeDialog}>
        <ConfirmProDialog openAlert={setOpenAlert} setAlertMsg={setMsg} onClose={closeDialog} />
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openAlert}
        autoHideDuration={5000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert className="!text-white" onClose={() => setOpenAlert(false)} severity={msg.type} variant="filled" sx={{ width: '100%' }}>
          {msg.msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SettingInfoPagePage;
