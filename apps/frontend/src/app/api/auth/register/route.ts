import { CatchAxiosError, Http } from '@utils';
import { ResponseBase } from '@shop/type';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const res = await Http.post<ResponseBase<any>>(`/api/auth/register`, body);
    return NextResponse.json(res.data);
  } catch (err) {
    return CatchAxiosError(err);
  }
}
