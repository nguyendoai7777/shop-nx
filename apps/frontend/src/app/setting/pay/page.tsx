import type { Metadata } from 'next';
import { PaymentPage } from './_component/payment.page';

export interface SettingPaymentProps {}
export const metadata: Metadata = {
  title: 'Cài đặt - Thanh toán',
};

const SettingPaymentPage: FCC<SettingPaymentProps> = () => {
  return <PaymentPage />;
};

export default SettingPaymentPage;
