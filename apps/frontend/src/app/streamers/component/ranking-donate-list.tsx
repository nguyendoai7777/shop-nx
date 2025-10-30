'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { XAvatar, XCard, XIndicatorSpin } from '@components';
import 'swiper/css';
import { Suspense, useEffect, useState } from 'react';
import { HttpClient } from '@client/utils';
import { ResponseBase, RSBUser } from '@shop/type';
import { httpResource, httpResourceAsync } from '@core/http';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

export interface CardListProps {}
const resource = httpResourceAsync(HttpClient.get<ResponseBase<RSBUser[]>>('streamer/ranking-donate'));

export const RankingDonateList: FCC<CardListProps> = ({}) => {
  // const b = use(resource).data;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RSBUser[]>([]);
  useEffect(() => {
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
        <Suspense fallback={<>Loading...</>}>
          <Swiper
            spaceBetween={8}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              400: {
                slidesPerView: 2.5,
              },
              640: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
              1440: {
                slidesPerView: 7,
              },
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {data.concat(data).map((it, i) => (
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
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
