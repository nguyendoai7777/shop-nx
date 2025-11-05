import { zAuthStore, zToastStore } from '@client/z-state';
import { FormEvent, useState } from 'react';
import type { DonateDto } from '@shop/dto';
import { httpResource } from '@core/http';
import { HttpClient } from '@client/utils';
import { ResponseBase, RSBDonated, Streamer } from '@shop/type';
import { MinReceive, vnd } from '@shop/platform';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';

export const useDonateService = (streamer: Streamer) => {
  const minReceive = streamer.channelRef.minReceive ?? MinReceive;
  const { closeToast, showToast } = zToastStore();
  const { user, clearError, setLoading } = zAuthStore();
  const [selectedValue, setSelectedValue] = useState(minReceive);
  const [showLogin, setShowLogin] = useState(false);

  const formRef = useForm<DonateDto>({
    defaultValues: {
      amount: minReceive,
      message: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const { trigger, setValue, setFocus } = formRef;

  const destroyDialog = () => {
    setShowLogin(false);
    setLoading(false);
    closeToast();
    clearError();
  };

  const handleDonate = (payload: DonateDto) => {
    httpResource(HttpClient.post<ResponseBase<RSBDonated>>(`donate/${streamer.id}`, payload)).subscribe({
      next(res) {
        setValue('message', '');
        showToast({
          type: 'success',
          msg: (
            <div>
              còn lại <b>{vnd(res.data.balance)}</b>
            </div>
          ),
        });
        setFocus('message');
      },
    });
  };

  const handleFormSubmit = (e: FormEvent, handleSubmit: UseFormHandleSubmit<DonateDto, DonateDto>) => {
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

  return {
    minReceive,
    selectedValue,
    showLogin,
    formRef,
    handleFormSubmit,
    setSelectedValue,
    destroyDialog,
    setAmountFromSelect,
  };
};
