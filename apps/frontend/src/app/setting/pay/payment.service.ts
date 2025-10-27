import { DepositDto } from '@shop/dto';
import { useState } from 'react';
import { httpResource } from '@core/http';
import { HttpClient } from '@client/utils';
import { ResponseBase } from '@shop/type';
import { zPaymentStore, zToastStore } from '@client/z-state';

export const usePaymentService = () => {
  const { showToast } = zToastStore();
  const { setBalance } = zPaymentStore();
  const [loading, setLoading] = useState(false);
  const handleDeposit = (payload: DepositDto) => {
    setLoading(true);
    httpResource(HttpClient.post<ResponseBase<DepositDto>>(`/wallet/deposit`, payload)).subscribe({
      next(res) {
        showToast({ type: 'success', msg: res.message });
        setBalance(res.data.amount);
      },
      completed() {
        setLoading(false);
      },
    });
  };

  return {
    loading,
    handleDeposit,
  };
};
