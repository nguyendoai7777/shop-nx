import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ResponseBase, RSBUser } from '@shop/type';
import { Http, loadConfig } from '@server/utils';
import { AuthResponse } from '@types';
import chalk from 'chalk';

// simple verify (có thể gọi BE verify nếu cần)
export async function GET() {
  const cookieStore = await cookies();
  const { ApiUrl } = await loadConfig();
  const token = cookieStore.get('token')?.value;
  console.log(chalk.bold.green`API /me Token`, token);
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

    console.log(chalk.bold.green`API /me Data`, data);
    if (!data) {
      return response;
    }

    return NextResponse.json<ResponseBase<AuthResponse>>({
      data: {
        user: data.data,
        accessToken: token,
        api: ApiUrl,
      },
      status: 400,
      message: data.message,
    });
  } catch (error) {
    // const e = error as ResponseBase<any>;
    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0), // xóa cookie
      path: '/',
    });
    return response;
  }
}
