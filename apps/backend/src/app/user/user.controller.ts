import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@decorators';
import { ResponseTransformer } from '@transformers';
import { ChannelDto, type UserInfoByJWT, UserInfoDTO, UserPasswordDTO } from '@shop/dto';

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

  @Post('channel')
  async createChannel(@Body() payload: ChannelDto, @User() user: UserInfoByJWT) {
    console.log(`@@ Create Channel [user]`, user);
    console.log(`@@ Create Channel [channel]`, payload);
    if (!payload.channel.startsWith('@')) {
      payload.channel = '@' + payload.channel;
    }
    const data = await this.userService.updateChannel(payload, user);
    return new ResponseTransformer({
      message: 'Thêm mới ok',
      status: 200,
      data,
    });
  }

  @Put('channel')
  updateChannel(@Body() payload: ChannelDto, @User() user: UserInfoByJWT) {
    console.log(`@@ Create Channel [user]`, user);
    console.log(`@@ Create Channel [channel]`, payload);
    return this.userService.updateChannel(payload, user);
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
