import { fetchStreamer } from '../streamer.service';

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
  const http = await fetchStreamer(id);
  console.log(`@@ Server Component`, { id });
  return <div>{id}</div>;
};

export default StreamerDetailPage;
