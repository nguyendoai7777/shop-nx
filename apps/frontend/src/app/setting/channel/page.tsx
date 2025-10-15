import type { Metadata } from 'next';

import SettingChanelPage from './setting-channel-page';

export interface PageProps {}

export const metadata: Metadata = {
  title: 'Cài đặt - Kênh',
};

const SettingChannelPage: FCC<PageProps> = () => {
  return <SettingChanelPage />;
};

export default SettingChannelPage;
