import { NextResponse } from 'next/server';
import { AuthResponse } from '@types';
import { ResponseBase } from '@shop/type';
import { CatchAxiosError, Http, loadConfig } from '@server/utils';
import { ServerCookieKey } from '@server/const';

export async function POST(req: Request) {
  const body = await req.json();
  const { ApiUrl } = await loadConfig();
  // gọi tới backend server login

  try {
    const { data: res } = await Http.post<ResponseBase<AuthResponse>>(`/api/auth/login`, body);
    const token = res.data!.accessToken;
    console.log(`@@ Server login`, res);
    const response = NextResponse.json<ResponseBase<AuthResponse>>({
      data: {
        user: res.data.user,
        accessToken: res.data.accessToken,
        api: ApiUrl,
        refreshToken: res.data.refreshToken,
      },
      message: res.message,
      status: res.status,
    });
    response.cookies.set(ServerCookieKey.accessToken, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    response.cookies.set(ServerCookieKey.refreshToken, token, {
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
