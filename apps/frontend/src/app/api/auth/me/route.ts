import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ResponseBase, RSBUser } from '@shop/type';
import { Http, loadConfig } from '@server/utils';
import type { AuthResponse } from '@types';
import { ServerCookieKey } from '@server/const';

// simple verify (có thể gọi BE verify nếu cần)
export async function GET() {
  const [cookieStore, { ApiUrl }] = await Promise.all([cookies(), loadConfig()]);
  /*const cookieStore = await cookies();
  const { ApiUrl } = await loadConfig();*/
  const token = cookieStore.get(ServerCookieKey.accessToken)?.value;
  const refreshToken = cookieStore.get(ServerCookieKey.refreshToken)?.value!;
  // console.log(chalk.bold.green`API /me Token`, token);
  const response = NextResponse.json<ResponseBase<{ api: string }>>({
    message: 'Chưa đăng nhập',
    status: 403,
    data: {
      api: ApiUrl,
    },
  });
  if (!token) {
    return response;
  }

  // gọi BE để lấy user info
  try {
    const { data } = await Http.get<ResponseBase<RSBUser>>(`/api/user/current`);

    // console.log(chalk.bold.green`API /me Data`, data);
    if (!data) {
      return response;
    }

    return NextResponse.json<ResponseBase<AuthResponse>>({
      data: {
        user: data.data,
        accessToken: token,
        api: ApiUrl,
        refreshToken,
      },
      status: 400,
      message: data.message,
    });
  } catch (error) {
    // const e = error as ResponseBase<any>;
    /*response.cookies.set(ServerCookieKey.accessToken, '', {
      httpOnly: true,
      expires: new Date(0), // xóa cookie
      path: '/',
    });*/
    return response;
  }
}
