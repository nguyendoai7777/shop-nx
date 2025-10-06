import { Http, json } from '@utils';
import { ResponseBase, Streamer } from '@shop/type';
import { StreamerDetail } from './streamer-detail';

export interface StreamerDetailProps {}
/*export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ({
    slug: post.slug,
  }))
}*/

const StreamerDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const _id = decodeURIComponent(id);

  if (_id.startsWith('@')) {
    const { data } = await Http.post<ResponseBase<Streamer>>(`/api/streamer/search`, {
      channel: _id,
    });
    console.log(`@@ Vip user`, data);
    return <StreamerDetail user={data!.data!} />;
  }

  const { data } = await Http.get<ResponseBase<Streamer>>(`/api/streamer/${id}`);

  if (!data.data) {
    return <div>Fail to load</div>;
  }
  console.log(`@@ Server Component`, { id });
  return <StreamerDetail user={data!.data!} />;
};

export default StreamerDetailPage;
