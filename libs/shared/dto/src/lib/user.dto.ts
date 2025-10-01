import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';

export class UserInfoDTO {
  @IsEmail({}, { message: 'Email Không đúng định dạng' })
  @IsDefined({ message: 'Email không được để trống' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsString()
  @ApiProperty({
    description: 'Validate theo email format',
    example: 'userOne@gmail.com',
    type: 'string',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Không để trống, min length = 6, max length 255',
    example: 'Nguyyễn Văn',
    type: 'string',
  })
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Không để trống, min length = 6, max length 255',
    example: 'Nam',
    type: 'string',
  })
  lastname: string;
}

export class UserPasswordDTO {
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
    {
      message:
        'Password phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt',
    }
  )
  @MinLength(8, { message: 'Mật khẩu ít nhất 8 ký tự' })
  @IsDefined({ message: 'Mật khẩu không được để trống' })
  @IsNotEmpty({ message: 'Mật khẩu ít nhất 8 ký tự' })
  @IsString()
  @ApiProperty({
    description: `cả password và verify password chung validate = ''`,
    example: '123@!Fvxs',
    type: 'string',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123@!Fvxs',
  })
  confirmPassword?: string;
}

export class CreateUserDto extends IntersectionType(
  UserInfoDTO,
  UserPasswordDTO
) {
  @MinLength(6, { message: 'username tối thiểu 6 ký tự' })
  @MaxLength(32, { message: 'username tối đa 32 ký tự' })
  @IsDefined({ message: 'Email không được để trống' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsString()
  @ApiProperty({
    description: 'username dùng để đăng nhập, [Min,Max]=[6,32]',
    example: 'iemhuongtram',
    type: 'string',
  })
  username: string;
}

export interface UserInfoByJWT {
  name: string;
  id: number;
  username: string;
  email: string;
  iat: number;
  exp: number;
}
