import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PasswordMatchConstraint } from '../decorators/password-matcher.decorator.js';

export class RefreshTokenDto {
  @IsDefined({ message: 'refreshToken không được để trống' })
  @IsNotEmpty({ message: 'refreshToken không được để trống' })
  @IsString()
  @ApiProperty({
    description: 'Refresh toke',
    example: 'ey...',
    type: 'string',
  })
  refreshToken: string;
}

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
  @ValidateIf((o) => o.password !== undefined && o.password !== '')
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {
    message: 'Password phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt',
  })
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
  @ValidateIf((o) => o.password !== undefined && o.password !== '')
  @Validate(PasswordMatchConstraint)
  @IsNotEmpty({ message: 'confirmPassword Vui lòng xác nhận lại mật khẩu' })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123@!Fvxs',
    required: false,
  })
  confirmPassword?: string;
}

export class CreateUserDto extends IntersectionType(UserInfoDTO, UserPasswordDTO) {
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

  verified: boolean;
  channel?: string;
}

export class RBStreamerBy {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `để tim streamer theo channel khi đã đăng ký pro`,
    type: 'string',
  })
  channel: string;
}
