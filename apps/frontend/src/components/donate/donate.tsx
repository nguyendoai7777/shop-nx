'use client';

import { Dialog, MenuItem } from '@mui/material';
import { MinReceive, vnd } from '@shop/platform';
import { useForm } from 'react-hook-form';
import { ControlGroup, ControlledIntField, ControlledTextField, SelectField } from '../form-field';
import { FormEvent, useState } from 'react';
import type { DonateDto } from '@shop/dto';
import { CButton } from '../button/button';
import { zAuthStore, zToastStore } from '@client/z-state';
import AuthDialog from '../auth/auth';
import { useAuth } from '../auth-context/auth-context';
import { httpResource } from '@core/http';
import { HttpClient } from '@client/utils';
import { Streamer } from '@shop/type';

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
  const { closeToast, showToast } = zToastStore();
  const { user, clearError } = zAuthStore();
  const minReceive = streamer.channelRef.minReceive ?? MinReceive;
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
    trigger,
  } = useForm<DonateDto>({
    defaultValues: {
      amount: minReceive,
      message: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });
  const { setLoading } = useAuth();

  const [selectedValue, setSelectedValue] = useState(minReceive);
  const [showLogin, setShowLogin] = useState(false);

  const destroyDialog = () => {
    setShowLogin(false);
    setLoading(false);
    closeToast();
    clearError();
  };

  const handleDonate = () => {
    const payload: DonateDto = {
      message: getValues('message'),
      amount: getValues('amount'),
    };
    httpResource(HttpClient.post(`donate/${streamer.id}`, payload)).subscribe({
      next() {},
    });
  };

  const _handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowLogin(true);
    } else {
      handleSubmit(handleDonate)();
    }
  };

  const setAmountFromSelect = (tag: string, value: number) => {
    setValue('amount', value);
    void trigger('amount');
  };

  return (
    <>
      <div className="mt-4 mb-1 font-semibold text-xl">
        Donate
        <code className="block w-fit mb-2 bg-gray-300/15 rounded font-light text-sm px-2"></code>
      </div>

      <form onSubmit={(e) => _handleSubmit(e)}>
        <div>Số tiền (Tối thiểu {vnd(minReceive)})</div>
        <ControlGroup>
          <div className="flex-1">
            <ControlledTextField
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
        <div className="mt-3">Lời nhắn</div>
        <ControlledTextField controller={{ control, name: 'message' }} controlProps={{ multiline: true, rows: 4 }} />
        <CButton type={'submit'} rounded className="min-w-[150px] !mx-auto !flex">
          {user ? 'Donate' : 'Đăng nhập để donate'}
        </CButton>
      </form>
      <Dialog open={showLogin} onClose={destroyDialog}>
        <AuthDialog isRegister={false} onClose={destroyDialog} />
      </Dialog>
    </>
  );
};

export default Donate;
