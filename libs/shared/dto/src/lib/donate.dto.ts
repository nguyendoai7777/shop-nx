import { TransectionDto } from './wallet.dto.js';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class DonateDto extends TransectionDto {
  @MaxLength(255, { message: `message tối đa 255 ký tự` })
  @IsString({ message: 'message là string' })
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'alo test donate',
    required: false,
    description: 'lời nhắn',
  })
  message?: string;
}
