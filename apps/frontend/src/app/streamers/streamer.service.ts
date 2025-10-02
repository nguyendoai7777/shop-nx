import { cookies } from 'next/headers';
import { ResponseBase, Streamer } from '@shop/type';
import { Http } from '@utils';

export const fetchStreamer = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const rs = await Http.get<ResponseBase<Streamer[]>>(`/api/streamer/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(`@@ Server fetchStreamer`, rs.data);

};

export const fetchStreamerList = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  /*const http = await HttpServer()
  const req = http.get<ResponseBase<any>>(`/api/streamer`)*/

  const res = await fetch(`http://localhost:3000/api/streamer`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const resp = (await res.json()) as ResponseBase<Streamer[]>;
  console.log(`@@ Server fetch`, resp);

  return resp;
};
