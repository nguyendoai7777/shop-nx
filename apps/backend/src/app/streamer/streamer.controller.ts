import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { TransformParams } from '@decorators';
import { PaginationDto, RBStreamerBy } from '@shop/dto';
import { ResponsePaginationTransformer, ResponseTransformer } from '@transformers';
import { UserService } from '../user/user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('streamer')
@ApiTags('Streamer')
export class StreamerController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query(TransformParams()) pagination: PaginationDto) {
    const { page, size } = pagination;
    const [data, total] = await this.userService.findAll(pagination);
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
    console.log(`@@ Adu`, payload);
    const data = await this.userService.findOneBy(payload);
    return new ResponseTransformer({
      data,
      status: 200,
      message: 'OK',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.userService.findOne(+id);

    return new ResponseTransformer({
      message: 'Success',
      data,
      status: HttpStatus.OK,
    });
  }
}
