import { Streamer } from '@shop/type';
import { Donate, SvgClient } from '@components';
import ChannelDescription from './channel-desc';

export interface StreamerDetailProps {
  user: Streamer;
}

export const StreamerDetail: FCC<StreamerDetailProps> = ({ user }) => {
  return (
    <div className="mt-4">
      <div className="relative">
        <img alt="intro" className="w-full h-auto aspect-[16/2.5]" src="/banner.jpg" />
        <div className="absolute left-2  w-45 h-45 z-20 top-[calc(100%-90px)]">
          <div className="relative h-full">
            <div className="rounded-full overflow-hidden absolute inset-5 h-fit">
              <img alt="avatar" width={160} height={160} src="/avt.jpg" />
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
                  {user.firstname} {user.lastname} &nbsp; • &nbsp;
                  <tspan fill="#FFD700" fontWeight="">
                    {user.channel}
                  </tspan>
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 items-start">
        <div className="w-1/3 mt-16">
          <div className="text-4xl flex gap-2 py-2 items-center">
            {user.firstname} {user.lastname} <SvgClient className="!w-5 !h-5" href="Verified" />
          </div>
          <div className="flex items-center gap-1 my-2">
            {user.verified ? (
              <>
                <div className="text-sm">{user.channel}</div> •{' '}
                <div className="text-sm font-light text-gray-400">{user.channelRef.followers} người theo dõi.</div>
              </>
            ) : null}
            {}
          </div>

          <ChannelDescription content={user.channelRef.description} links={user.channelRef.externalLinks} />

          <Donate />
        </div>
        <div className="w-2/3"></div>
      </div>
    </div>
  );
};
