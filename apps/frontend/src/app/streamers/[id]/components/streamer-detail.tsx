import { Streamer } from '@shop/type';
import { Donate, ForwardImg, SvgClient } from '@components';
import ChannelDescription from './channel-desc';
import { DonateList } from './donate-list';

export interface StreamerDetailProps {
  streamer: Streamer;
}

export const StreamerDetail: FCC<StreamerDetailProps> = ({ streamer }) => {
  return (
    <div className="mt-4">
      <div className="relative">
        <ForwardImg
          className="w-full h-auto aspect-[16/2.5]"
          src={streamer.banner ?? '/profile-img/placeholder/profile-banner.webp'}
        />
        {/*<img alt="intro" className="w-full h-auto aspect-[16/2.5]" src={user.banner ?? '/profile-img/placeholder/profile-banner.webp'} />*/}
        <div className="absolute left-2  w-45 h-45 z-20 top-[calc(100%-90px)]">
          <div className="relative h-full">
            <div className="rounded-full overflow-hidden absolute inset-5 h-fit">
              <ForwardImg
                width={160}
                height={160}
                src={streamer.avatar ?? '/profile-img/placeholder/profile-banner.webp'}
              />
            </div>
            <svg
              viewBox="0 0 200 200"
              className="absolute pointer-events-none inset-0 z-30 animate-spin"
              style={{ animationDuration: '20s', animationDelay: '3s' }}
            >
              <defs>
                <path id="textTop" d="M100,100 m-85,0 a85,85 0 1,1 170,0 a85,85 0 1,1 -170,0" />
              </defs>
              <text className="text-sm fill-white" fontSize="12" textAnchor="middle" fontFamily="sans-serif">
                <textPath href="#textTop" startOffset="50%">
                  {streamer.firstname} {streamer.lastname} &nbsp; • &nbsp;
                  <tspan fill="#FFD700" fontWeight="">
                    {streamer.channel}
                  </tspan>
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 items-start">
        <div className="w-1/3 mt-16 sticky top-[80px]">
          <div className="text-4xl flex gap-2 py-2 items-center">
            {streamer.firstname} {streamer.lastname} <SvgClient className="!w-5 !h-5" href="Verified" />
          </div>
          <div className="flex items-center gap-1 my-2">
            {streamer.verified ? (
              <>
                <div className="text-sm">{streamer.channel}</div> •{' '}
                <div className="text-sm font-light text-gray-400">{streamer.channelRef.followers} người theo dõi.</div>
              </>
            ) : null}
            {}
          </div>

          <ChannelDescription content={streamer.channelRef.description} links={streamer.channelRef.externalLinks} />

          <Donate streamer={streamer} />
        </div>
        <div className="w-2/3">
          <DonateList streamer={streamer} />
        </div>
      </div>
    </div>
  );
};
