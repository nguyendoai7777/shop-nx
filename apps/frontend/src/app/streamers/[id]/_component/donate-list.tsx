'use client';
import { DonateItem } from './donate-item';
import type { Streamer } from '@shop/type';
import { useDonationSocket } from '@client/hooks';
import { AnimateRenderer } from '@components';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export interface DonateListProps {
  streamer: Streamer;
}

const Ani = {
  initElementInList: 10,
  delayEach: 0.05,
};

export const DonateList: FCC<DonateListProps> = ({ streamer }) => {
  const { donationList, loading } = useDonationSocket(streamer.id);
  const [initAnimation, setInitAnimation] = useState(true);
  useEffect(() => {
    setInitAnimation(true);
    const to = setTimeout(
      () => {
        setInitAnimation(false);
      },
      Ani.delayEach * Ani.initElementInList * 1000 + 1000
    );
    return () => {
      clearTimeout(to);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <AnimateRenderer
            list={donationList}
            render={DonateItem}
            onAnimate={(_, index) => ({
              layout: true,
              initial: { opacity: 0, x: '100%', y: -25, scale: 0.98 }, // trượt nhẹ từ trên + scale nhỏ
              animate: { opacity: 1, x: 0, y: 0, scale: 1 },
              exit: { opacity: 0, x: '100%', y: -25, scale: 0.95 },
              transition: {
                type: 'spring',
                stiffness: 320, // độ nảy
                damping: 24, // độ giảm chấn
                mass: 0.6, // nhẹ hơn -> nhanh hơn
                delay: initAnimation ? index * Ani.delayEach : 0,
              },
            })}
          />
        )}
      </div>
    </>
  );
};
