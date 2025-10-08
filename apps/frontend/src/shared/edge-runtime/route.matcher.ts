export const PrivateRouteConfig = [
  '/user', // Exact: /user
  '/user/:path*', // Wildcard: /user/anything, /user/123, /user/profile/settings
  '/dashboard', // Exact: /dashboard
  '/dashboard/:path*', // Wildcard: /dashboard/analytics, /dashboard/settings/profile
  '/profile', // Specific dynamic: /profile/123/edit
  '/setting', // Specific dynamic: /profile/123/edit
  '/setting/:path*', // Specific dynamic: /profile/123/edit
];

export function isPrivateRoute(pathname: string): boolean {
  return PrivateRouteConfig.some((pattern) => {
    // Convert pattern to regex
    // /user/:id -> /^\/user\/[^\/]+$/
    // /user/:path* -> /^\/user\/.+$/

    // Escape special regex characters except : and *
    let regexPattern = pattern
      .replace(/\//g, '\\/') // Escape /
      .replace(/:path\*/g, '.+') // :path* matches anything
      .replace(/:(\w+)/g, '[^\\/]+'); // :id, :name matches segment (không có /)

    // Add start and end anchors
    regexPattern = `^${regexPattern}$`;

    const regex = new RegExp(regexPattern);
    return regex.test(pathname);
  });
}
