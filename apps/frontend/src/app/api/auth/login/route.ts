import { NextResponse } from 'next/server';
import { UserFromLogin } from '@types';
import { ResponseBase } from '@shop/type';

export async function POST(req: Request) {
  const body = await req.json();

  // gọi tới backend server login
  const res = await fetch(`http://localhost:3000/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Login failed' }, { status: res.status });
  }

  const data: ResponseBase<UserFromLogin> = await res.json();
  const token = data.data!.accessToken;
  const user = data.data!.user;

  if (!token) {
    return NextResponse.json({ error: 'No token returned' }, { status: 500 });
  }

  // tạo response và set cookie
  const response = NextResponse.json({ success: true, user });
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
