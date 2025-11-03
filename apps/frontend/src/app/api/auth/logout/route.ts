import { NextResponse } from 'next/server';
import { ServerCookieKey } from '@server/const';

export async function GET() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ServerCookieKey.accessToken, '', {
    httpOnly: true,
    expires: new Date(0), // xóa cookie
    path: '/',
  });
  response.cookies.set(ServerCookieKey.refreshToken, '', {
    httpOnly: true,
    expires: new Date(0), // xóa cookie
    path: '/',
  });
  return response;
}
