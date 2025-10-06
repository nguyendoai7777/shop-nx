import { Streamer } from '@shop/type';
import { SvgClient } from '@components';
import { json } from '@utils';

export interface StreamerDetailProps {
  user: Streamer;
}

export const StreamerDetail: FCC<StreamerDetailProps> = ({ user }) => {
  return (
    <div className="mt-4">
      <img
        alt="intro"
        width="100%"
        height="auto"
        src="https://yt3.googleusercontent.com/KlzuCB4jzsUT00qQofOx1iLbTKIabY4l5kkGuRng3_9ohloWR4EleAQhOJLM8zFHEwpPbiub2yU=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
      />
      <div className="flex gap-4 mt-4">
        <div className="rounded-full overflow-hidden">
          <img
            alt="avatar"
            width={160}
            height={160}
            src="https://yt3.googleusercontent.com/e2eVBdYK0yR0LSkArtkWeLj9ZrXCy148jaUI_6Esuw_eGgxrStTzUsGX86TLLp1vZqgrKixgOg=s160-c-k-c0x00ffffff-no-rj"
          />
        </div>
        <div>
          <span className="text-4xl flex gap-2 items-center">
            {user.firstname} {user.lastname} <SvgClient className="!w-5 !h-5" href="Verified" />
          </span>
          <div className="flex items-center gap-1 mt-2">
            {user.verified ? (
              <>
                <div className="text-sm">{user.channel}</div> •
              </>
            ) : null}
            {}
          </div>
          <pre>{json(user)}</pre>
        </div>
      </div>
    </div>
  );
};
