import type { Metadata } from 'next';
import { Sidenav } from './component/sidenav';

export interface SettingLayoutProps {
}


const SettingLayoutPage: FCC<SettingLayoutProps> = ({children}) => {

  return (
    <div className="flex h-[200svh] gap-4 mt-4 items-start">
      <Sidenav />
      {children}
    </div>
  );
};

export default SettingLayoutPage;