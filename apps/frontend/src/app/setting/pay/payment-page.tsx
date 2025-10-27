'use client';
import { Deposit } from './component/deposit';
import { Withdraw } from './component/withdraw';
import { IntegratedDigitCard } from './component/integrated-digit-card';

export interface PaymentPageProps {}

export const PaymentPage: FCC<PaymentPageProps> = ({}) => {
  return (
    <div className="flex-1">
      <IntegratedDigitCard />
      <div className="grid grid-cols-2 gap-4 ">
        <Deposit />
        <Withdraw />
      </div>
    </div>
  );
};
