import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClientService, RedisService } from '@services';
import { CreateUserDto, LoginDto } from '@shop/dto';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { EResMessage, RedisKey } from '@constants';
import { AuthApiResponse, UserJWT } from '@shop/type';
import { ResponseTransformer } from '@shop/factory';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly jwt$$: JwtService
    // private readonly redis: RedisService
  ) {}

  /*async refreshToken(refreshToken: string) {

      const payload = await this.jwt$$.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const key = `${RedisKey.tokenRefresh}:${payload.sub}`;
      const storedToken = await this.redis.get<string>(key);

      // Kiểm tra token hợp lệ và còn lưu trong Redis
      if (!storedToken || storedToken !== refreshToken) {
        throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
      }

      // Cấp lại accessToken mới
      const newAccessToken = await this.jwt$$.signAsync(
        {
          sub: payload.sub,
          username: payload.username,
          email: payload.email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        },
      );

      return newAccessToken

  }*/

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

    if (!user) {
      throw new BadRequestException(err);
    }

    const isValid = await verify(user.password, dto.password);

    if (!isValid) {
      throw new BadRequestException(err);
    }

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
    const key = `${RedisKey.tokenRefresh}:${user.id}`;
    await this.redis.set(key, refreshToken, 730 * 24 * 3600);

    const { password, ...user2 } = user;
    return new ResponseTransformer<AuthApiResponse>({
      message: EResMessage.LoginSuccess,
      status: HttpStatus.OK,
      data: {
        accessToken: token,
        refreshToken,
        user: user2,
      },
    });
  }
}
