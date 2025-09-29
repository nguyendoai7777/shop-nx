import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isPrivateRoute } from '@edge-runtime';

/*
export const PrivateRouteConfig = [
  "/user",           // Exact: /user
  "/user/:path*",    // Wildcard: /user/anything, /user/123, /user/profile/settings
  "/streamers",      // Exact: /streamers
  "/streamer/:id",   // Dynamic: /streamer/123, /streamer/abc
  "/dashboard",      // Exact: /dashboard
  "/dashboard/:path*", // Wildcard: /dashboard/analytics, /dashboard/settings/profile
  "/profile/:id/edit", // Specific dynamic: /profile/123/edit
];

function isPrivateRoute(pathname: string): boolean {
  return PrivateRouteConfig.some((pattern) => {
    let regexPattern = pattern
      .replace(/\//g, '\\/') // Escape /
      .replace(/:path\*!/g, '.+') // :path* matches anything
      .replace(/:(\w+)/g, '[^\\/]+'); // :id, :name matches segment (không có /)

    // Add start and end anchors
    regexPattern = `^${regexPattern}$`;

    const regex = new RegExp(regexPattern);
    return regex.test(pathname);
  });
}
*/

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value; // token bạn set sau khi login
  console.log(`@@ Next MiddleWare`, {token});
  // Nếu truy cập /user/* mà chưa login thì redirect về "/"
  // Bỏ qua static files và API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
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

export const config = {
  matcher: ['/:path*'],
};

