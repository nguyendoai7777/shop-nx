import { IsInt, IsOptional, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class _PaginationDto {
  @IsInt()
  @IsOptional()
  @Min(0, { message: `Page index không hợp lệ` })
  @Transform(({ value }) => Number(value))
  @ApiProperty({ required: false })
  page = 1;

  @IsInt()
  @IsOptional()
  @Min(1, { message: `Page size không hợp lệ` })
  @Transform((params) => Number(params.value))
  @ApiProperty({ required: false })
  size = 10;

  @IsOptional()
  @ApiProperty({ required: false })
  search = '';
}
