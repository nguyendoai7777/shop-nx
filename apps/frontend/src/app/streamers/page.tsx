import { Metadata } from 'next';
import { CardButton } from './card-button';
import Link from 'next/link';
import { Http } from '@server/utils';
import { ResponseBase, Streamer } from '@shop/type';
import { SvgClient } from '@components';
import './streamer.scss';
import { httpResourceAsync } from '@core/http';

export const metadata: Metadata = {
  title: 'Danh sách streamer',
};

/*export async function getStaticProps() {
  const { data } = await Http.get<ResponseBase<Streamer[]>>(`/api/streamer`);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts: data,
    },
  }
}*/

export default async function StreamersPage() {
  const { data, error } = await httpResourceAsync<ResponseBase<Streamer[]>>(Http.get(`/api/streamer`));

  console.log(`@@ Server streamer`, data);
  if (error) {
    return <div>Fetch Streamers fail</div>;
  }

  return (
    <>
      <h1 className="pb-2 font-semibold text-2xl mt-1">Danh sách</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 mt-4">
        {(data!.data ?? []).map((str) => (
          <CardButton key={str.id}>
            <Link
              href={`/streamers/${str.verified ? (str.channel ?? str.id) : str.id}`}
              className={`StreamerCard overflow-hidden flex !ustify-start items-center gap-2 rounded-md bg-gray-700/50 p-3 duration-300 border border-transparent w-full ${
                str.verified ? 'hover:border-purple-500' : 'hover:border-gray-600'
              } `}
            >
              <div className="w-10 aspect-square bg-pink-700 rounded-full"></div>
              <div>
                <div className="text-left flex gap-2 items-center">
                  <span className="">
                    {str.firstname} {str.lastname}
                  </span>
                  {str.verified ? <SvgClient className="!w-3 !h-3" href="Verified" /> : null}
                </div>
                <div className="text-left">{str.email}</div>
              </div>
            </Link>
          </CardButton>
        ))}
      </div>
    </>
  );
}
