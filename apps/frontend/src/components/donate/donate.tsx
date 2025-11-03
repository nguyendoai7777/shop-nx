'use client';

import { Dialog, MenuItem } from '@mui/material';
import { vnd } from '@shop/platform';
import { ControlGroup, ControlledField, ControlledIntField, SelectField } from '../form-field';
import { CButton } from '../button/button';
import { zAuthStore } from '@client/z-state';
import AuthDialog from '../auth/auth';
import { Streamer } from '@shop/type';
import { useDonateService } from './donate.service';
import { Keydown } from '@components';
import { Platform } from '@client/utils';
import { TipsAndUpdatesTwoTone } from '@mui/icons-material';

export interface DonateProps {
  streamer: Streamer;
}

const Options = [
  { label: '8,000', value: 8000 },
  { label: '10,000', value: 10000 },
  { label: '20,000', value: 20000 },
  { label: '36,000', value: 36000 },
  { label: '50,000', value: 50000 },
  { label: '100,000', value: 100000 },
];

export const Donate: FCC<DonateProps> = ({ streamer }) => {
  const { user } = zAuthStore();
  const {
    minReceive,
    selectedValue,
    showLogin,
    handleFormSubmit,
    setAmountFromSelect,
    setSelectedValue,
    destroyDialog,
    formRef,
  } = useDonateService(streamer);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formRef;
  return (
    <>
      <div className="mt-4 mb-1 font-semibold text-xl">
        Donate
        <code className="block w-fit mb-2 bg-gray-300/15 rounded font-light text-sm px-2"></code>
      </div>
      <Keydown.meta.enter enter={(e) => handleFormSubmit(e, handleSubmit)}>
        <form onSubmit={(e) => handleFormSubmit(e, handleSubmit)}>
          <div className="text-sm text-gray-300 mb-1">Số tiền (Tối thiểu {vnd(minReceive)})</div>
          <ControlGroup>
            <div className="flex-1">
              <ControlledField
                controller={{
                  control,
                  name: 'amount',
                  rules: {
                    min: {
                      value: minReceive,
                      message: `Tối thiểu ${vnd(minReceive)}`,
                    },
                  },
                }}
                component={ControlledIntField}
                textError={errors?.amount?.message}
              />
            </div>
            <SelectField
              value={selectedValue}
              className="self-start"
              onChange={(e) => {
                const val = e.target.value as number;
                setValue('amount', val);
                setSelectedValue(val);
              }}
            >
              {Options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value} onClick={(e) => setAmountFromSelect('Click', opt.value)}>
                  {opt.label}
                </MenuItem>
              ))}
            </SelectField>
          </ControlGroup>
          <div className="text-sm text-gray-300 mb-1">Lời nhắn</div>
          <ControlledField
            disableFixedError
            controller={{ control, name: 'message' }}
            controlProps={{ multiline: true }}
          />
          <div className="text-[10px] text-gray-400 mt-2 flex items-center">
            <TipsAndUpdatesTwoTone className="text-white mr-1" sx={{ fontSize: 12 }} />
            Bấm tổ hợp
            <kbd className="bg-white/10 px-1 rounded mx-0.5">{Platform.modifierKey}</kbd>
            <kbd className="bg-white/10 px-1 rounded mr-0.5">Enter</kbd>
            để Donate nhanh.
          </div>
          <CButton type={'submit'} rounded className="w-full md:w-auto min-w-[150px] !mx-auto !flex !mt-2">
            {user ? 'Donate' : 'Đăng nhập để donate'}
          </CButton>
        </form>
        <Dialog className="XDialog" open={showLogin} onClose={destroyDialog}>
          <AuthDialog onClose={destroyDialog} />
        </Dialog>
      </Keydown.meta.enter>
    </>
  );
};

export default Donate;
