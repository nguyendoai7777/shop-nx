import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { SlugNumber, TransformParams } from '@decorators';
import { PaginationDto, RBStreamerBy } from '@shop/dto';
import { ApiTags } from '@nestjs/swagger';
import { StreamerService } from './streamer.service';
import { ResponsePaginationTransformer, ResponseTransformer } from '@shop/factory';
import type { RSBDonation, RSBDonorTop, TopDonateQuery } from '@shop/type';

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
  @Get('donate-history/:id')
  async getDonateList(@SlugNumber('id') id: number) {
    const data = await this.ss.findDonateHistory(id);
    return new ResponseTransformer<RSBDonation[]>({
      message: 'OK',
      data,
      status: HttpStatus.OK,
    });
  }

  @Get('ranking-donate')
  async getTopDonate() {
    const data = await this.ss.getTopDonate();
    return new ResponseTransformer<{}>({
      message: 'OK',
      status: HttpStatus.OK,
      data,
    });
  }

  @Get('donate-top/:id')
  async getTopDonateByStreamer(@SlugNumber('id') id: number, @Query() query: TopDonateQuery) {
    const data = await this.ss.getTopDonorsByStreamer(id, query.filter);
    return new ResponseTransformer<RSBDonorTop[]>({
      message: 'OK',
      data,
      status: HttpStatus.OK,
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
