import { Http, json } from '@utils';
import { ResponseBase, Streamer } from '@shop/type';

export interface StreamerDetailProps {}
/*export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ({
    slug: post.slug,
  }))
}*/

const StreamerDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await Http.get<ResponseBase<Streamer>>(
    `/api/streamer/${id}`
  );

  if (!data.data) {
    return <div>Fail to load</div>;
  }
  console.log(`@@ Server Component`, { id });
  return <div className="min-h-[200svh]">
    <pre>{json(data.data)}</pre>
  </div>;
};

export default StreamerDetailPage;
