import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { TransformParams } from '@decorators';
import { PaginationDto, RBStreamerBy } from '@shop/dto';
import { ApiTags } from '@nestjs/swagger';
import { StreamerService } from './streamer.service';
import { ResponsePaginationTransformer, ResponseTransformer } from '@shop/factory';

@Controller('streamer')
@ApiTags('Streamer')
export class StreamerController {
  constructor(private readonly ss: StreamerService) {}

  @Get()
  async findAll(@Query(TransformParams()) pagination: PaginationDto) {
    const { page, size } = pagination;
    const [data, total] = await this.ss.findAll(pagination);
    return new ResponsePaginationTransformer({
      status: HttpStatus.OK,
      message: 'Success',
      data,
      pagination: {
        page,
        size,
        total,
      },
    });
  }

  @Post('/search')
  async findOneBy(@Body() payload: RBStreamerBy) {
    const data = await this.ss.findOneBy(payload);
    return new ResponseTransformer({
      data,
      status: 200,
      message: 'OK',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.ss.findOne(+id);

    return new ResponseTransformer({
      message: 'Success',
      data,
      status: HttpStatus.OK,
    });
  }
}
