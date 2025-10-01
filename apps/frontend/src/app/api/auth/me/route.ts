import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ResponseBase } from '@shop/type';
import { UserFromDetail } from '@types';

// simple verify (có thể gọi BE verify nếu cần)
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  // gọi BE để lấy user info
  const res = await fetch(`http://localhost:3000/api/user/current`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return NextResponse.json({ user: null });
  }

  const data: ResponseBase<UserFromDetail> = await res.json();
  return NextResponse.json({ user: data.data });
}
