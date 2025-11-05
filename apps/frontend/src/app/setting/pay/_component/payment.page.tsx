'use client';
import { Deposit } from './deposit';
import { Withdraw } from './withdraw';
import { IntegratedDigitCard } from './integrated-digit-card';

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
