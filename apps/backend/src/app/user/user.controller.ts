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


  @Get(`current`)
  async current(@User() user: UserInfoByJWT) {
    const data = await this.userService.findOne(user.id);

    return new ResponseTransformer({
      message: 'Success',
      data,
      status: HttpStatus.OK,
    });
  }

  @Post(`update-info`)
  updateUserInfo(@Body() dto: UserInfoDTO, @User() user: any) {
    return `ok`;
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
