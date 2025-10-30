import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClientService, RedisService } from '@services';
import { CreateUserDto, LoginDto } from '@shop/dto';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { RedisKey } from '@constants';
import { UserJWT } from '@shop/type';
import { c } from '@utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly jwt$$: JwtService,
    private readonly redis: RedisService
  ) {}

  async refreshToken(rfToken: string) {
    const user = await this.jwt$$.verifyAsync<UserJWT>(rfToken, {
      secret: process.env.SECRET_KEY_REFRESH,
    });
    console.log(c.bold.cyan`@@ Decoded token`, user);
    const key = `${RedisKey.tokenRefresh}:${user.id}`;
    const storedToken = await this.redis.get<string>(key);
    console.log(c.bold.cyan`@@ Refresh Token`, storedToken);
    if (!storedToken || storedToken !== rfToken) {
      throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
    }

    const _payload: Partial<UserJWT> = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    const refreshToken = await this.jwt$$.signAsync(_payload, {
      secret: process.env.SECRET_KEY_REFRESH,
      expiresIn: '30d',
    });
    const accessToken = await this.jwt$$.signAsync(_payload);
    return {
      refreshToken,
      accessToken,
    };
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        password: data.password,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        wallet: {
          create: {
            balance: 0,
          },
        },
      },
      omit: {
        password: true,
      },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.username }, { username: dto.username }],
      },
    });

    const err = {
      message: `Thông tin đăng nhập không chính xác.`,
      status: HttpStatus.UNAUTHORIZED,
    };

    if (!user) throw new BadRequestException(err);
    const isValid = await verify(user.password, dto.password);
    if (!isValid) throw new BadRequestException(err);
    const refreshKey = `${RedisKey.tokenRefresh}:${user.id}`;
    const accessKey = `${RedisKey.tokenAccess}:${user.id}`;
    await Promise.all([this.redis.del(refreshKey), this.redis.del(accessKey)]);

    const payload: Partial<UserJWT> = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    const token = await this.jwt$$.signAsync(payload);

    // Refresh Token: dài hạn
    const refreshToken = await this.jwt$$.signAsync(payload, {
      secret: process.env.SECRET_KEY_REFRESH,
      expiresIn: '30d',
    });
    const rfKey = `${RedisKey.tokenRefresh}:${user.id}`;
    const acKey = `${RedisKey.tokenAccess}:${user.id}`;

    await this.redis.set(rfKey, refreshToken, 30 * 24 * 3600);
    await this.redis.set(acKey, token, 7 * 24 * 3600);

    const { password, ...user2 } = user;
    return {
      accessToken: token,
      refreshToken,
      user: user2,
    };
  }

  async logout(accessToken: string) {
    const user = await this.jwt$$.verifyAsync<UserJWT>(accessToken, {
      secret: process.env.SECRET_KEY_REFRESH,
    });
    const accessKey = `${RedisKey.tokenAccess}:${user.id}`;
    const refreshKey = `${RedisKey.tokenRefresh}:${user.id}`;
    await Promise.all([this.redis.del(refreshKey), this.redis.del(accessKey)]);
    return {
      data: 'ok',
    };
  }
}
