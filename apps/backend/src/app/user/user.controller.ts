import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { TransformParams } from '@decorators';
import {
  ResponsePaginationTransformer,
  ResponseTransformer,
} from '@transformers';
import {
  PaginationDto,
  type UserInfoByJWT,
  UserInfoDTO,
  UserPasswordDTO,
} from '@shop/dto';
import { User } from '@decorators';

@Controller('user')
@ApiTags('User')
export class UserController {
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.userService.findOne(+id);

    return new ResponseTransformer({
      message: 'Success',
      data,
      status: HttpStatus.OK,
    });
  }

  @Post(`update-info`)
  updateUserInfo(@Body() dto: UserInfoDTO, @User() user: any) {
    return this.userService.updateUserInfo();
  }

  @Post(`change-password`)
  changePassword(@User() user: UserInfoByJWT, @Body() dto: UserPasswordDTO) {
    return this.userService.changePassword(dto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
