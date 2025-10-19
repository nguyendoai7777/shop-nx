'use client';

import { Navlink } from '@components';

export interface SidenavProps {}

export const Sidenav: FCC<SidenavProps> = () => {
  return (
    <div
      style={{
        maxHeight: `calc(100svh - 88px)`,
        backgroundColor: `oklch(0.6 0 0 / 0.2)`,
      }}
      className="rounded-xl bg-pink-700 sticky top-[94px] flex flex-col gap-[1px] py-2 min-w-[220px] ml-13"
    >
      <Navlink className="!w-full !rounded-none h-9 !px-3 !justify-start duration-150" href="/setting/info">
        Thông tin
      </Navlink>
      <Navlink className="!w-full !rounded-none h-9 !px-3 !justify-start duration-150" href="/setting/channel">
        Kênh
      </Navlink>
      <Navlink className="!w-full !rounded-none h-9 !px-3 !justify-start duration-150" href="/setting/pay">
        Thanh toán
      </Navlink>
    </div>
  );
};
