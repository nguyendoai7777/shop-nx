import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { type CreateUserDto, LoginDto } from '@shop/dto';
import { verifyPassword } from '@utils';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Tạo mới user', description: 'API tạo mới user' })
  async register(@Body() dto: CreateUserDto) {
    console.log(`@@ request in`, dto);
    dto.password = await verifyPassword(dto.password, dto.confirmPassword!);
    console.log(`@@ hashed pw`, dto.password);
    return this.authService.create(dto);
  }

  @ApiOperation({ summary: 'đăng nhập', description: 'Login' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
