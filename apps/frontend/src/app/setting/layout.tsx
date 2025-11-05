import { Sidenav } from './channel/_component/sidenav';

export interface SettingLayoutProps {}

const SettingLayoutPage: FCC<SettingLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-1 lg:gap-4 mt-4 items-start">
      <Sidenav />
      {children}
    </div>
  );
};

export default SettingLayoutPage;
