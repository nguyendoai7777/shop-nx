import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ResponseBase } from '@shop/type';
import { UserFromDetail } from '@types';
import { loadConfig } from '@utils';

// simple verify (có thể gọi BE verify nếu cần)
export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const {ApiUrl} = await loadConfig();

  if (!token) {
    return NextResponse.json({ user: null });
  }

  // gọi BE để lấy user info
  const res = await fetch(`${ApiUrl}/user/current`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return NextResponse.json({ user: null });
  }

  const data: ResponseBase<UserFromDetail> = await res.json();
  return NextResponse.json({ user: data.data });
}
