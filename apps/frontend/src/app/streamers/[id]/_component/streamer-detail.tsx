import { Streamer } from '@shop/type';
import { Donate, ForwardImg, XAvatar } from '@components';
import ChannelDescription from './channel-desc';
import { DonateList } from './donate-list';
import { TopDonate } from './top-donate';

export interface StreamerDetailProps {
  streamer: Streamer;
}

export const StreamerDetail: FCC<StreamerDetailProps> = ({ streamer }) => {
  return (
    <div className="mt-4">
      <div className="hidden md:block relative">
        {streamer.banner ? (
          <ForwardImg className="w-full h-auto aspect-[16/2.5]" src={streamer.banner} />
        ) : (
          <div className="w-full h-auto aspect-[16/2.5] bg-white/10"></div>
        )}
        <div className="absolute left-2  w-45 h-45 z-20 top-[calc(100%-90px)]">
          <div className="relative h-full">
            <div className="rounded-full overflow-hidden absolute inset-5 h-fit">
              <XAvatar user={streamer} avatarSize={`100%`} className={'w-full h-full text-3xl'} />
            </div>
            {streamer.channelRef ? (
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
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4 items-start">
        <div className="md:w-1/3 mt-0 lg:mt-16 md:sticky md:top-[80px] overflow-x-hidden w-full">
          <div className="text-3xl flex gap-2 py-2 items-center">
            {streamer.firstname} {streamer.lastname}
          </div>
          <div className="flex items-center gap-1 my-2">
            {streamer.verified ? (
              <>
                <div className="text-sm">{streamer.channel}</div> •{' '}
                <div className="text-sm font-light text-gray-400 line-clamp-1">
                  {streamer.channelRef.followers} người theo dõi.
                </div>
              </>
            ) : null}
            {}
          </div>
          {streamer.channelRef ? (
            <>
              <ChannelDescription content={streamer.channelRef.description} links={streamer.channelRef.externalLinks} />
              <Donate streamer={streamer} />
              <hr className="my-4 text-gray-400/20" />
              <TopDonate streamer={streamer} />
            </>
          ) : (
            <></>
          )}
        </div>
        {streamer.channelRef ? (
          <div className="md:w-2/3 w-full">
            <div className="md:hidden mb-2">Donate</div>
            <DonateList streamer={streamer} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
