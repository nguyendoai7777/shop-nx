import { Streamer } from '@shop/type';
import { SvgClient } from '@components';
import { json } from '@utils';

export interface StreamerDetailProps {
  user: Streamer;
}

export const StreamerDetail: FCC<StreamerDetailProps> = ({ user }) => {
  return (
    <div className="mt-4">
      <div className="relative">
        <img
          alt="intro"
          width="100%"
          height="auto"
          src="https://yt3.googleusercontent.com/KlzuCB4jzsUT00qQofOx1iLbTKIabY4l5kkGuRng3_9ohloWR4EleAQhOJLM8zFHEwpPbiub2yU=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
        />
        <div
          className=" absolute left-12  w-[180px] h-[180px] z-20"
          style={{
            top: `calc(100% - 90px)`,
          }}
        >
          <div className="relative">
            <div className="rounded-full overflow-hidden absolute inset-5 h-fit">
              <img
                alt="avatar"
                width={160}
                height={160}
                src="https://yt3.googleusercontent.com/e2eVBdYK0yR0LSkArtkWeLj9ZrXCy148jaUI_6Esuw_eGgxrStTzUsGX86TLLp1vZqgrKixgOg=s160-c-k-c0x00ffffff-no-rj"
              />
            </div>
            <svg viewBox="0 0 200 200" className="absolute pointer-events-none inset-0 z-30">
              <defs>
                {/* Nửa trên */}
                <path id="textTop" d="M100,100 m-85,0 a85,85 0 0,1 170,0" />
                {/* Nửa dưới */}
                <path id="textBottom" d="M100,100 m-85,0 a85,85 0 0,0 170,0" />
              </defs>

              {/* Dòng trên */}
              <text className="text-sm fill-white" fontSize="12" textAnchor="middle" fontFamily="sans-serif">
                <textPath href="#textTop" startOffset="50%">
                  KÊNH YOUTUBE CỦA TUẤN TIỀN TỈ
                </textPath>
              </text>

              {/* Dòng dưới */}
              <text className="text-sm font-light text-gray-400" fontSize="12" textAnchor="middle" fontFamily="sans-serif">
                <textPath href="#textBottom" startOffset="50%">
                  GIAO LƯU VUI VẺ
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 items-start">
        <div className=" w-1/3">
          <div className="text-4xl flex gap-2 py-2 items-center">
            {user.firstname} {user.lastname} <SvgClient className="!w-5 !h-5" href="Verified" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            {user.verified ? (
              <>
                <div className="text-sm">{user.channel}</div> •{' '}
                <div className="text-sm font-light text-gray-400">{user.channelRef.followers} người theo dõi.</div>
              </>
            ) : null}
            {}
          </div>
          <div className="whitespace-pre-line">{user.channelRef.description}</div>
        </div>
        <div className="w-2/3">
          <pre>{json(user)}</pre>
        </div>
      </div>
    </div>
  );
};
