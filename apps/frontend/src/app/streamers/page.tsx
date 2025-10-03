import { Metadata } from 'next';
import { CardButton } from './card-button';
import Link from 'next/link';
import { Http } from '@utils';
import { ResponseBase, Streamer } from '@shop/type';
import { httpResource, httpResourceAsync } from '../../shared/factory';

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

  if (error) {
    return <div>Fetch Streamers fail</div>;
  }

  return (
    <>
      <h1 className="pb-2 font-semibold text-2xl mt-1">Danh sách</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 mt-4">
        {(data.data ?? []).map((str) => (
          <CardButton key={str.id}>
            <Link
              href={`/streamers/${str.id}`}
              className="overflow-hidden flex !ustify-start items-center gap-2 rounded-md bg-gray-700/50 p-3 duration-300 border border-transparent hover:border-gray-600 w-full"
            >
              <div className="w-10 aspect-square bg-pink-700 rounded-full"></div>
              <div>
                <div className="text-left">
                  {str.firstname} {str.lastname}
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
