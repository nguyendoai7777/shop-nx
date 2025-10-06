import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

function pathToRegex(pattern: string): RegExp {
  // Bước 1: thay thế glob ** và *
  let regexStr = pattern
    .replace(/\*\*/g, '<<<DOUBLE>>>') // placeholder
    .replace(/\*/g, '<<<SINGLE>>>'); // placeholder

  // Bước 2: escape các ký tự regex đặc biệt
  regexStr = regexStr.replace(/[.+?^${}()|[\]\\]/g, '\\$&');

  // Bước 3: trả lại placeholder thành regex thật
  regexStr = regexStr
    .replace(/<<<DOUBLE>>>/g, '.*') // ** = match nhiều segment
    .replace(/<<<SINGLE>>>/g, '[^/]+'); // *  = match 1 segment

  return new RegExp(`^${regexStr}$`);
}

function isOpenRoute(url: string, routes: string[]): boolean {
  const path = url.split('?')[0].split('#')[0];
  return routes.some((pattern) => pathToRegex(pattern).test(path));
}
const openRoutes = [
  '/api/streamer',
  '/api/streamer/**',
  '/api/auth/**',
  '/api/public/**',
];

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // if (request.url.startsWith('/api/auth')) return true;
    // if (openRoutes.includes(request.url))
    console.log(`@@ [${request.method}] route`, {
      url: request.url,
      isPublic: isOpenRoute(request.url, openRoutes)
    });
    if (isOpenRoute(request.url, openRoutes)) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
