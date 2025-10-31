import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { verifyPassword } from '@utils';
import { ResponseTransformer } from '@shop/factory';
import { CreateUserDto, LoginDto, RefreshTokenDto } from '@shop/dto';
import type { AuthApiResponse } from '@shop/type';
import { EResMessage } from '@constants';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Tạo mới user', description: 'API tạo mới user' })
  async register(@Body() dto: CreateUserDto) {
    dto.password = await verifyPassword(dto.password, dto.verifiedPassword!);
    const data = await this.authService.create(dto);
    return new ResponseTransformer({
      data,
      message: 'Đăng ký thành công',
      status: HttpStatus.OK,
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'đăng nhập', description: 'Login' })
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);
    return new ResponseTransformer<AuthApiResponse>({
      message: EResMessage.LoginSuccess,
      status: HttpStatus.OK,
      data,
    });
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'refresh token', description: 'Refresh token' })
  async refreshToken(@Body() payload: RefreshTokenDto) {
    const d = await this.authService.refreshToken(payload.refreshToken);
    return new ResponseTransformer<Omit<AuthApiResponse, 'user'>>({
      data: {
        refreshToken: d.refreshToken,
        accessToken: d.accessToken,
      },
      status: HttpStatus.OK,
      message: 'OK',
    });
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout', description: 'logout' })
  async logout(@Query('accessToken') accessToken?: string) {
    const message = 'Logout thành công';
    const res = new ResponseTransformer({
      message,
      status: HttpStatus.OK,
    });
    if (!accessToken) {
      return res;
    }
    await this.authService.logout(accessToken);
    return res;
  }
}
