import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientService } from '@services';
import type { CreateUserDto, LoginDto, UserInfoByJWT } from '@shop/dto';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { ResponseTransformer } from '@transformers';
import { EResMessage } from '@constants';
import { AuthApiResponse } from '@shop/type';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly jwt$$: JwtService
  ) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        password: data.password,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
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

    const err = new ResponseTransformer({
      message: `Thông tin đăng nhập không chính xác.`,
      status: HttpStatus.UNAUTHORIZED,
    });

    if (!user) {
      throw new BadRequestException(err);
    }

    const isValid = await verify(user.password, dto.password);

    if (!isValid) {
      throw new BadRequestException(err);
    }

    const payload: Partial<UserInfoByJWT> = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = await this.jwt$$.signAsync(payload);
    const { password, ...user2 } = user;
    return new ResponseTransformer<AuthApiResponse>({
      message: EResMessage.LoginSuccess,
      status: HttpStatus.OK,
      data: {
        accessToken: token,
        user: user2,
      },
    });
  }
}
