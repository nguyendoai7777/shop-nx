import { ApiProperty } from '@nestjs/swagger';

export class ExternalLink {
  @ApiProperty({
    description: `tên ngắn của link liên kết như fb, toptop, ...`,
    type: 'string',
    required: false
  })
  shortname?: string

  @ApiProperty({
    description: `link liên kết như fb, topto, ...`,
    type: 'string',
  })
  url: string
}


export class ChannelDto {
  @ApiProperty({
    description: `tên kênh`,
    type: 'string',
    required: false,
  })
  channel: string;

  @ApiProperty({
    description: `Mô tả kênh`,
    type: 'string',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: `link liên kết như fb, topto, ...`
  })
  externalLinks: ExternalLink[]
}

export class UpdateChannelDto {

  @ApiProperty({
    description: `tên kênh`,
    type: 'string',
    required: false,
  })
  channel: string;

}