import { BadRequestException } from '@nestjs/common';
import { IsOptional, ValidateIf } from 'class-validator';

export class UploadImageDto {
  @IsOptional()
  banner?: Express.Multer.File[];

  @IsOptional()
  avatar?: Express.Multer.File[];
}

export class UploadImageDtoValidator {
  static validateFiles(dto: UploadImageDto) {
    if (!dto.banner && !dto.avatar) {
      throw new BadRequestException('Phải upload ít nhất 1 trong 2 file: banner hoặc avar');
    }
  }
}
