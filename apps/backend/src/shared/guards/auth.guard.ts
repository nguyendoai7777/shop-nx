import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import chalk from 'chalk';
import { Deeppink, DodgeBlue, RedisKey } from '@constants';
import { RedisService } from '@services';
import { UserJWT } from '@shop/type';
import { c } from '@utils';

function pathToRegex(pattern: string): RegExp {
  let regexStr = pattern.replace(/\*\*/g, '<<<DOUBLE>>>').replace(/\*/g, '<<<SINGLE>>>');
  regexStr = regexStr.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  regexStr = regexStr.replace(/<<<DOUBLE>>>/g, '.*').replace(/<<<SINGLE>>>/g, '[^/]+');

  return new RegExp(`^${regexStr}$`);
}

function isOpenRoute(url: string, routes: string[]): boolean {
  const path = url.split('?')[0].split('#')[0];
  return routes.some((pattern) => pathToRegex(pattern).test(path));
}
const openRoutes = ['/api/streamer', '/api/streamer/**', '/api/auth/**', '/api/public/**'];

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly redis: RedisService
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    console.log(chalk.hex(Deeppink).bold(`@@`), chalk.hex(DodgeBlue).bold(`[${request.method}]`));
    console.log({
      url: request.url,
      isPublic: isOpenRoute(request.url, openRoutes),
    });
    if (isOpenRoute(request.url, openRoutes)) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const user = await this.jwtService.verifyAsync<UserJWT>(token);
    const accessKey = `${RedisKey.tokenAccess}:${user.id}`;
    const storedToken = await this.redis.get<string>(accessKey);

    if (!storedToken || storedToken !== token) {
      throw new UnauthorizedException();
    }
    request['user'] = user;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
