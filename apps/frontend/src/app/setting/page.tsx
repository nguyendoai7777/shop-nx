import SettingInfoPagePage from './info/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cài đặt - Thông tin cá nhân',
};

export default function SettingPage() {
  return (
    <>
      <SettingInfoPagePage />
    </>
  );
}
