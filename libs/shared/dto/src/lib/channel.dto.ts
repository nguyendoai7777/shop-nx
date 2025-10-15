import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterProChannel {
  @IsDefined({ message: 'channel không được để trống' })
  @IsNotEmpty({ message: 'channel không được để trống' })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `tên kênh`,
    type: 'string',
    required: true,
  })
  channel: string;

  @IsDefined({ message: 'Subscription không được để trống' })
  @IsNotEmpty({ message: 'Subscription không được để trống' })
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: `gói đăng ký trong bao lâu`,
    type: 'string',
    required: true,
  })
  subscription: number;
}

export class ExternalLink {
  @ApiProperty({
    description: `tên ngắn của link liên kết như fb, toptop, ...`,
    type: 'string',
    required: false,
  })
  shortname?: string;

  @IsDefined({ message: 'url không được để trống' })
  @IsNotEmpty({ message: 'url không được để trống' })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `link liên kết như fb, topto, ...`,
    type: 'string',
  })
  url: string;
}
export class ChannelDto {
  @IsDefined({ message: 'channel không được để trống' })
  @IsNotEmpty({ message: 'channel không được để trống' })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `tên kênh`,
    type: 'string',
    required: true,
  })
  channel: string;

  @ApiProperty({
    description: `Mô tả kênh`,
    type: 'string',
    required: false,
  })
  description?: string;

  @ValidateNested({ each: true })
  @Type(() => ExternalLink)
  @ApiProperty({
    description: `danh sách link liên kết như fb, topto, ...`,
  })
  externalLinks: ExternalLink[];
}

export class UpdateChannelDto {
  @ApiProperty({
    description: `tên kênh`,
    type: 'string',
    required: false,
  })
  channel: string;
}
