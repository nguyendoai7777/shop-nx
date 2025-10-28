'use client';

import { useEffect, useState } from 'react';
import { AnimateRenderer, CButton, ControlGroup, Renderer, XAvatar, Xvg } from '@components';
import { Prettify, ResponseBase, RSBDonorTop, Streamer, TopDonateQueryType } from '@shop/type';
import { httpResource } from '@core/http';
import { HttpClient } from '@client/utils';
import { vnd } from '@shop/platform';

import './donate.css';
import { DonateItem } from './donate-item';
import { Skeleton } from '@mui/material';

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
