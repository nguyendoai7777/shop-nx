import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isPrivateRoute } from '@core/route';
import { ServerCookieKey } from '@server/const';
import chalk from 'chalk';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(ServerCookieKey.accessToken)?.value; // token bạn set sau khi login
  // Nếu truy cập /user/* mà chưa login thì redirect về "/"
  // Bỏ qua static files và API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  if (isPrivateRoute(pathname) && !token) {
    // Redirect về / với query param
    const url = new URL('/', req.url);
    url.searchParams.set('auth', 'required');
    url.searchParams.set('returnUrl', pathname);

    return NextResponse.redirect(url);
  }

  // Cho phép request tiếp tục
  return NextResponse.next();
}

/* export const config = {
  matcher: ['/:path*'],
};

 */
