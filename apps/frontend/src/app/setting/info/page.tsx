import type { Metadata } from 'next';
import SettingInfoPage from './setting-info-page';

export const metadata: Metadata = {
  title: 'Cài đặt - Thông tin cá nhân',
};

const SettingPage = () => {
  return <SettingInfoPage />;
};

export default SettingPage;
