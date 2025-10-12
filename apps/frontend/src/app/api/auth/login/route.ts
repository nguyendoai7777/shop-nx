import { NextResponse } from 'next/server';
import { AuthResponse, UserFromDetail } from '@types';
import { ResponseBase } from '@shop/type';
import { CatchAxiosError, Http, loadConfig } from '@server/utils';

export async function POST(req: Request) {
  const body = await req.json();
  const { ApiUrl } = await loadConfig();
  // gọi tới backend server login

  try {
    const { data } = await Http.post<ResponseBase<UserFromDetail>>(`/api/auth/login`, body);
    const token = data.data!.accessToken;
    console.log(`@@ Server login`, data);
    const response = NextResponse.json<AuthResponse>({
      user: data.data.user,
      accessToken: data.data.accessToken,
      api: ApiUrl,
    });
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
