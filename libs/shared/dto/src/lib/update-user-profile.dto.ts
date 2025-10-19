import { IsNotEmpty, IsOptional, IsString, Matches, MinLength, Validate, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PasswordMatchConstraint } from '../decorators/password-matcher.decorator.js';

export class UploadImageDto {
  banner?: Express.Multer.File[];

  @IsOptional()
  avatar?: Express.Multer.File[];
}

export class UpdateUserProfileDto {
  @ValidateIf((o) => o.password !== undefined && o.password !== '')
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {
    message: 'password Password phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt',
  })
  @MinLength(8, { message: 'password Mật khẩu ít nhất 8 ký tự' })
  @IsString()
  @ApiProperty({
    description: 'password Password mới (nếu cần thay đổi)',
    example: '123@!Fvxs',
    type: 'string',
    required: false,
  })
  password?: string;

  @ValidateIf((o) => o.password !== undefined && o.password !== '')
  @Validate(PasswordMatchConstraint)
  @IsNotEmpty({ message: 'confirmPassword Vui lòng xác nhận lại mật khẩu' })
  @IsString()
  @ApiProperty({
    example: '123@!Fvxs',
    required: false,
  })
  confirmPassword?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Tên, và đệm',
    required: false,
    type: 'string',
  })
  firstname?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Tên',
    required: false,
    type: 'string',
  })
  lastname?: string;
}
