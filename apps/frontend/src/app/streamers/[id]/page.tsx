import { Http } from '@server/utils';
import { ResponseBase, Streamer } from '@shop/type';
import { StreamerDetail } from './components';
import { Metadata } from 'next';
import { cache } from 'react';

const NoData = ({ id }: { id: any }) => (
  <div className="text-center mt-20 text-3xl">
    Không tồn tại <b>{id}</b>
  </div>
);

const getStreamerData = cache(async (id: string): Promise<Streamer | null> => {
  const _id = decodeURIComponent(id);
  const isChannel = _id.startsWith('@');
  const endpoint = isChannel ? '/api/streamer/search' : `/api/streamer/${_id}`;
  const method = isChannel ? 'post' : 'get';
  const payload = isChannel ? { channel: _id.slice(1) } : undefined;

  try {
    const { data } = await Http[method]<ResponseBase<Streamer>>(endpoint, payload);
    return data?.data ?? null;
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const streamer = await getStreamerData(id);

  if (!streamer) {
    return {
      title: 'Streamer không tồn tại',
      description: `Không tìm thấy streamer ${id}`,
    };
  }
  const description = streamer.channelRef?.description ?? '',
    title = streamer.channel ? streamer.channel + ' on XDonate' : `${streamer.firstname} ${streamer.lastname}`;
  return {
    metadataBase: new URL('http://localhost:3000'),
    title,
    description,
    openGraph: {
      title,
      description,
      ...(streamer.avatar && { images: streamer.avatar }),
    },
  };
}

const StreamerDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const streamer = await getStreamerData(id);
  if (!streamer) {
    return <NoData id={id} />;
  }

  return <StreamerDetail streamer={streamer} />;
};

export default StreamerDetailPage;
