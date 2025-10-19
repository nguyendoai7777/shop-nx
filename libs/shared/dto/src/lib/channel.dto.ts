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
    example: 'ZP SeniGauGau',
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
    example: 6,
  })
  subscription: number;
}

export class ExternalLink {
  @ApiProperty({
    description: `tên ngắn của link liên kết như fb, toptop, ...`,
    type: 'string',
    required: false,
    example: 'SenaGauGau',
  })
  shortname?: string;

  @IsDefined({ message: 'url không được để trống' })
  @IsNotEmpty({ message: 'url không được để trống' })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `link liên kết như fb, topto, ...`,
    type: 'string',
    example: `https://www.youtube.com/s/desktop/9af06a99/img/favicon_144x144.png`,
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
    example: 'senagaugau',
  })
  channel: string;

  @ApiProperty({
    description: `Mô tả kênh`,
    type: 'string',
    required: false,
    example: 'Đây là Kênh ...',
  })
  description?: string;

  @ValidateNested({ each: true })
  @Type(() => ExternalLink)
  @ApiProperty({
    description: `danh sách link liên kết như fb, topto, ...`,
    example: <ExternalLink[]>[
      {
        url: 'https://www.youtube.com/s/desktop/9af06a99/img/favicon_144x144.png',
        shortname: 'YT SenaGauGau',
      },
    ],
  })
  externalLinks: ExternalLink[];
}
