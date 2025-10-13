import { AlertColor, ButtonBase, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import { useFormChange } from '@client/hooks';
import { RegisterChannelResponse, ResponseBase } from '@shop/type';

import { useStore } from 'zustand/react';
import { zAuthStore } from '@client/z-state';
import { httpResource } from '@core/http';
import { HttpClient } from '@client/utils';

export interface ConfirmProDialogProps {
  onClose(): void;
  openAlert(state: boolean): void;
  setAlertMsg(data: { type: AlertColor; msg: string }): void;
}

const ConfirmProDialog: FCC<ConfirmProDialogProps> = ({ onClose, setAlertMsg, openAlert }) => {
  const { user, setUser } = useStore(zAuthStore, (state) => state);
  const { value, handleInput, setValue } = useFormChange({
    channel: '',
    subscription: 6,
  });

  const handleRadio = (subscription: number) => {
    // console.log(`@@ duration`, duration);
    setValue({
      ...value,
      subscription,
    });
  };
  const handleRegisterPro = async () => {
    httpResource(HttpClient.post<ResponseBase<RegisterChannelResponse>>(`/api/user/channel`, value)).subscribe({
      next({ data: { channel, verified }, message }) {
        setAlertMsg({
          type: 'success',
          msg: message,
        });
        openAlert(true);
        onClose();
        user &&
          setUser({
            ...user,
            verified: verified,
            channel: channel,
          });
        httpResource(
          HttpClient.put(`/api/user/channel`, {
            description: '',
            externalLinks: [],
            channel,
          })
        ).subscribe();
      },
      error(err) {
        setAlertMsg({
          type: 'error',
          msg: err.message,
        });
        openAlert(true);
      },
    });
  };

  return (
    <>
      <div className="text-white pt-4 py-2 w-80">
        <label id="selectSubscriptionMethod" className="block px-6 pb-2 border-b border-gray-600 text-xl">
          Chọn gói
        </label>

        <RadioGroup
          aria-labelledby="selectSubscriptionMethod"
          onChange={(e) => {
            console.log(e.target.value);
            handleRadio(+e.target.value);
          }}
          value={value.subscription}
          name="purchaseSubscriptionMethod"
          color="#fff"
        >
          <FormControlLabel
            className="pl-6 duration-150 hover:bg-gray-500/25 !mr-0"
            value={1}
            control={<Radio />}
            label="1 tháng"
          />
          <FormControlLabel
            className="pl-6 duration-150 hover:bg-gray-500/25 !mr-0"
            value={6}
            control={<Radio />}
            label="6 tháng"
          />
          <FormControlLabel
            className="pl-6 duration-150 hover:bg-gray-500/25 !mr-0"
            value={12}
            control={<Radio />}
            label="1 năm"
          />
        </RadioGroup>
        <div className="px-6 my-2">
          <TextField
            label={`Mã nhận dạng kênh`}
            name="channel"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">@</InputAdornment>,
              },
            }}
            onChange={(e) => handleInput(e, 'channel')}
          />
          <div className="mt-1 w-fit text-xs rounded px-2 pb-0.5 bg-gray-400/20">/streamer/@{value.channel}</div>
        </div>
        <p className="px-6 text-sm pb-2 text-gray-400">
          Không thể hoàn tác hoặc thay đổi sau khi đã đăng ký, vui lòng cân nhắc kỹ.
        </p>
        <div className="flex justify-end px-2 gap-2 pt-2 border-t border-gray-600">
          <ButtonBase className="duration-150 !rounded-full hover:!bg-btn-base-hover-bg" onClick={onClose}>
            <div className="w-25 py-1.5">Hủy</div>
          </ButtonBase>
          <ButtonBase onClick={handleRegisterPro} className="duration-150 !rounded-full hover:!bg-purple-500/10">
            <span className="w-25 py-1.5 text-purple-500">Đăng ký</span>
          </ButtonBase>
        </div>
      </div>
    </>
  );
};

export default ConfirmProDialog;
