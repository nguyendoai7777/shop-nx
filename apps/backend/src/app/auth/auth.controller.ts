import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { type CreateUserDto, LoginDto, RefreshTokenDto } from '@shop/dto';
import { verifyPassword } from '@utils';
import { ResponseTransformer } from '@shop/factory';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Tạo mới user', description: 'API tạo mới user' })
  async register(@Body() dto: CreateUserDto) {
    dto.password = await verifyPassword(dto.password, dto.confirmPassword!);
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
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /*@Post()
  @ApiOperation({ summary: 'refresh token', description: 'Refresh token' })
  async refreshToken(@Body() payload: RefreshTokenDto) {
    const d = await this.authService.refreshToken(payload.refreshToken);
    return new ResponseTransformer<{}>({
      data: {
        refreshToken: d,
      },
      status: HttpStatus.OK,
      message: 'OK',
    });
  }*/
}
