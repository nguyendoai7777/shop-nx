import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@decorators';
import { ChannelDto, RegisterProChannel, type UserInfoByJWT, UserInfoDTO, UserPasswordDTO } from '@shop/dto';
import { ExternalLinkResponseSchema, RegisterChannelResponse, SettingInfoRequestBody } from '@shop/type';
import { ResponseTransformer } from '@shop/factory';
import chalk from 'chalk';

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

  @Get(`setting`)
  async setting(@User() user: UserInfoByJWT) {
    const data = await this.userService.findUserSetting(user);
    return new ResponseTransformer({
      data,
      status: 200,
      message: 'OK',
    });
  }

  @Post('channel')
  async createChannel(@Body() payload: RegisterProChannel, @User() user: UserInfoByJWT) {
    const channel = await this.userService.createChannel(payload, user);
    return new ResponseTransformer<RegisterChannelResponse>({
      message: 'Đăng ký kênh thành công',
      status: 200,
      data: {
        channel: payload.channel,
        verified: true,
        channelRef: {
          id: channel.id,
          createdAt: channel.createdAt as any,
          followers: 0,
          updatedAt: channel.updatedAt as any,
          description: channel.description ?? '',
          externalLinks: [],
        },
      },
    });
  }

  @Put('setting-info')
  async updateChannel(@Body() payload: ChannelDto, @User() user: UserInfoByJWT) {
    try {
      const d = await this.userService.updateSettingInfo(payload, user);
      return new ResponseTransformer({
        message: 'Cập nhật thành công',
        status: HttpStatus.OK,
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
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
