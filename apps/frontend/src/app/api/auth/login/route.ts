import { NextResponse } from 'next/server';
import { UserFromDetail } from '@types';
import { ResponseBase } from '@shop/type';
import { CatchAxiosError, Http } from '@utils';

export async function POST(req: Request) {
  const body = await req.json();

  // gọi tới backend server login

  try {
    const { data } = await Http.post<ResponseBase<UserFromDetail>>(
      `/api/auth/login`,
      body
    );
    const response = NextResponse.json(data.data);
    const token = data.data!.accessToken;
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return response;
  } catch (e) {
    return CatchAxiosError(e);
  }
}
