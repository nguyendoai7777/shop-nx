'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Renderer, XAvatar, XCard } from '@components';

import { useEffect, useState } from 'react';
import { HttpClient } from '@client/utils';
import { ResponseBase, RSBUser } from '@shop/type';
import { httpResource } from '@core/http';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Skeleton } from '@mui/material';
import 'swiper/css';
import { SwiperConfig } from './swiper.config';

export interface CardListProps {}

export const RankingDonateList: FCC<CardListProps> = ({}) => {
  const prefetch = Array.from({ length: 12 }, (_, i) => ({ id: i + 1 }));
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RSBUser[]>([]);
  useEffect(() => {
    setLoading(true);
    httpResource(HttpClient.get<ResponseBase<RSBUser[]>>('streamer/ranking-donate')).subscribe({
      next(res) {
        setData(res.data);
      },
      completed() {
        setLoading(false);
      },
    });
  }, []);
  const LoadedError = () => <>Load failed</>;
  return (
    <>
      <ErrorBoundary errorComponent={LoadedError}>
        {loading ? (
          <div className="flex gap-2 overflow-hidden">
            <Renderer
              list={prefetch}
              render={() => (
                <div className="min-w-[calc(50%-0.25rem)] xsm:min-w-[calc(33.3333%-0.35rem)] sm:min-w-[calc(25%-.4rem)] lg:min-w-[calc(20%-.4rem)] xl:min-w-[calc(100%/7-.45rem)] 2xl:min-w-[calc(100%/9-.45rem)]">
                  <Skeleton variant="rectangular" className="rounded-xl aspect-[167/222] !h-auto" />
                </div>
              )}
            />
          </div>
        ) : (
          <Swiper {...SwiperConfig} onSlideChange={() => console.log('slide change')} className="XSwiper">
            {data.map((it, i) => (
              <SwiperSlide key={i}>
                <XCard index={i} className="">
                  <div className="w-3/4 aspect-square mx-auto">
                    <XAvatar avatarSize="100%" user={it} />
                  </div>
                  <div className="line-clamp-1 text-center text-xs md:text-base mt-2">
                    {it.firstname} {it.lastname}
                  </div>
                </XCard>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </ErrorBoundary>
    </>
  );
};
