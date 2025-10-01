import { NextResponse } from 'next/server';
import { UserFromDetail } from '@types';
import { ResponseBase } from '@shop/type';

export async function POST(req: Request) {
  const body = await req.json();

  // gọi tới backend server login
  const res = await fetch(`http://localhost:3000/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data: ResponseBase<UserFromDetail> = await res.json();

  if (!res.ok) {
    return NextResponse.json(data);
  }
  const token = data.data!.accessToken;

  if (!token) {
    return data;
  }

  // tạo response và set cookie
  const response = NextResponse.json(data);
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
