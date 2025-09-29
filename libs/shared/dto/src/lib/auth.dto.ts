import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'username hoặc email',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Mật khẩu',
  })
  password: string;
}
