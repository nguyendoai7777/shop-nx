import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ResponseBase } from '@shop/type';
import { UserFromDetail } from '@types';
import { Http, loadConfig } from '@utils';

// simple verify (có thể gọi BE verify nếu cần)
export async function GET() {
  const cookieStore = await cookies();
  const { ApiUrl } = await loadConfig();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  // gọi BE để lấy user info
  const { data } = await Http.get<ResponseBase<UserFromDetail>>(
    `/api/user/current`
  );

  if (!data.data) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: data.data,
    accessToken: token,
    api: ApiUrl,
  });
}
