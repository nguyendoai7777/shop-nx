import type { Metadata } from 'next';

export interface SettingPaymentProps {}
export const metadata: Metadata = {
  title: 'Cài đặt - Thanh toán'
}

const SettingPaymentPage: FCC<SettingPaymentProps> = () => {
  return <div>setting payment</div>;
};

export default SettingPaymentPage;
