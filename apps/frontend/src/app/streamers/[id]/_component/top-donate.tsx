'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { AnimateRenderer, CButton, ControlGroup, Empty, XAvatar, Xvg } from '@components';
import { Prettify, ResponseBase, RSBDonorTop, Streamer, TopDonateQueryType } from '@shop/type';
import { httpResource } from '@core/http';
import { HttpClient } from '@client/utils';
import { vnd } from '@shop/platform';

import './top-donate.css';

export interface TopDonateProps {
  streamer: Streamer;
  loaded?(contentLoaded: boolean): void;
}

export interface TabButtonProps<V extends string | number> {
  value: V;
  selected: V;
  onClick?(value: V): void;
}

export const TabButton: FCC<TabButtonProps<TopDonateQueryType>> = ({
  selected,
  value,
  children,
  className,
  onClick,
}) => {
  return (
    <CButton
      size={`xsm`}
      onClick={() => onClick?.(value)}
      className={`${className} !text-xs ${selected === value ? '!bg-gray-300/25' : ''}`}
    >
      {children}
    </CButton>
  );
};

export const TopDonate: FCC<TopDonateProps> = ({ streamer, loaded }) => {
  const { id } = streamer;
  const [tab, setTab] = useState<TopDonateQueryType>('all');
  const [donor, setDonor] = useState<RSBDonorTop[]>([]);
  const [loading, setLoading] = useState(true);
  const handleChange = (tab: TopDonateQueryType) => {
    setTab(tab);
  };

  useEffect(() => {
    setLoading(true);
    httpResource(
      HttpClient.get<ResponseBase<RSBDonorTop[]>>(`/streamer/donate-top/${id}`, {
        params: {
          filter: tab,
        },
      })
    ).subscribe({
      next(res) {
        setDonor(res.data);
      },
      completed() {
        setLoading(false);
      },
    });
  }, [tab]);
  useEffect(() => {
    loaded?.(false);
  }, []);
  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <div>Top</div>
        <div className="flex">
          <ControlGroup>
            <TabButton onClick={handleChange} value="all" selected={tab}>
              Tổng
            </TabButton>
            <TabButton onClick={handleChange} value="today" selected={tab}>
              Ngày
            </TabButton>
            <TabButton onClick={handleChange} value="month" selected={tab}>
              Tháng
            </TabButton>
          </ControlGroup>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        {loading ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="!rounded-xl" animation="wave" variant="rounded" height={50} />
            <Skeleton className="!rounded-xl" animation="wave" variant="rounded" height={50} />
            <Skeleton className="!rounded-xl" animation="wave" variant="rounded" height={50} />
          </div>
        ) : (
          <>
            <AnimateRenderer
              list={donor}
              render={(d, i) => <TopDonateItem {...d} i={i} />}
              onAnimate={(_, index) => ({
                layout: true,
                initial: { opacity: 0, x: '100%', scale: 0.98 },
                animate: { opacity: 1, x: 0, scale: 1 },
                exit: { opacity: 0, x: '100%', scale: 0.95 },
                transition: {
                  type: 'spring',
                  stiffness: 320,
                  damping: 24,
                  mass: 0.6,
                  delay: index * 0.03,
                },
              })}
            />
            <Empty when={!donor.length}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#25314C" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.558 12.3 19.4 5.814A3.549 3.549 0 0 0 16 3.25H8a3.549 3.549 0 0 0-3.4 2.564L2.443 12.3a3.732 3.732 0 0 0-.193 1.187V18A3.383 3.383 0 0 0 6 21.75h12A3.383 3.383 0 0 0 21.75 18v-4.513a3.748 3.748 0 0 0-.192-1.187ZM6.028 6.288A2.063 2.063 0 0 1 8 4.75h8a2.063 2.063 0 0 1 1.972 1.538l2.07 6.212h-3a3.376 3.376 0 0 0-2.886 1.763 2.5 2.5 0 0 1-4.318 0A3.376 3.376 0 0 0 6.955 12.5h-3Z"
                  fill="#25314C"
                />
              </svg>
            </Empty>
          </>
        )}
      </div>
    </>
  );
};

const MapStyle: Record<number, string> = {
  0: 'Top Top1',
  1: 'Top Top2',
  2: 'Top Top3',
};

export const TopDonateItem: FCC<Prettify<RSBDonorTop & { i: number }>> = (user) => {
  const style = MapStyle[user.i] ?? 'Nor',
    isTop = [0, 1, 2].includes(user.i);
  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-xl ${style}`}>
      <div className="relative">
        <XAvatar user={user} />
        {isTop ? (
          <div className="avatar-deco">
            <Xvg className="w-full h-full" src="Crown" />
          </div>
        ) : null}
      </div>
      <div className="line-clamp-1 text-xs md:text-base">
        {user.firstname} {user.lastname}
      </div>
      <div className="ml-auto  text-xs md:text-base">{vnd(user.amount)}</div>
    </div>
  );
};
