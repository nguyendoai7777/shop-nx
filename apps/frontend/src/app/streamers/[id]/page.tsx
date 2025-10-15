import { Http } from '@server/utils';
import { ResponseBase, Streamer } from '@shop/type';
import { StreamerDetail } from './components';
const NoData = ({ id }: { id: any }) => (
  <div className="text-center mt-20 text-3xl">
    Không tồn tại <b>{id}</b>
  </div>
);
const StreamerDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const _id = decodeURIComponent(id);
  const isChannel = _id.startsWith('@');
  const endpoint = isChannel ? '/api/streamer/search' : `/api/streamer/${_id}`;
  const method = isChannel ? 'post' : 'get';
  const userChannel = isChannel ? _id : id;
  const payload = isChannel ? { channel: _id.slice(1) } : undefined;

  try {
    const { data } = await Http[method]<ResponseBase<Streamer>>(endpoint, payload);

    if (!data?.data) {
      return <NoData id={userChannel} />;
    }

    return <StreamerDetail user={data.data} />;
  } catch {
    return (
      <div className="text-center mt-20 text-3xl">
        Không tồn tại <b>{_id}</b>
      </div>
    );
  }
};

export default StreamerDetailPage;
