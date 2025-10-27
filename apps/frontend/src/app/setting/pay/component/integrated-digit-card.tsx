'use client';
import { useEffect } from 'react';
import { httpResource } from '@core/http';
import { HttpClient } from '@client/utils';
import { BalanceResponse, ResponseBase } from '@shop/type';
import { vnd } from '@shop/platform';
import { zPaymentStore } from '@client/z-state';

export interface IntegratedDigitCardProps {}

export const IntegratedDigitCard: FCC<IntegratedDigitCardProps> = ({}) => {
  const { balance, setBalance } = zPaymentStore();
  useEffect(() => {
    httpResource(HttpClient.get<ResponseBase<BalanceResponse>>(`/wallet/balance`)).subscribe({
      next(res) {
        console.log(`@@ balance`, res);
        setBalance(res.data.balance);
      },
    });
  }, []);
  return (
    <>
      <div className="flex items-end gap-1">
        Tổng số dư: <div className="text-green-600 text-2xl font-semibold"> {vnd(balance)}</div> ₫
      </div>
    </>
  );
};

/*
*
      <div className="w-[85.6mm] h-ba[53.98mm] rounded-[3mm] bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl p-6 text-white flex flex-col justify-between"></div>

* */
