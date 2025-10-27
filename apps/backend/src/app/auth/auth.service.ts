import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientService } from '@services';
import { CreateUserDto, LoginDto } from '@shop/dto';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { EResMessage } from '@constants';
import { AuthApiResponse, UserJWT } from '@shop/type';
import { ResponseTransformer } from '@shop/factory';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly jwt$$: JwtService
  ) {}

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
