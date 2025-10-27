import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@decorators';
import { ChannelDto, RegisterProChannel, UpdateUserProfileDto, UserPasswordDTO } from '@shop/dto';
import type { RegisterChannelResponse, UserJWT } from '@shop/type';
import { ResponseTransformer } from '@shop/factory';
import { removeEmptyFields, verifyPassword } from '@utils';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(`current`)
  async current(@User() user: UserJWT) {
    const data = await this.userService.findOne(user.id);

    return new ResponseTransformer({
      message: 'Success',
      data,
      status: HttpStatus.OK,
    });
  }

  @Get(`setting-user`)
  async settingInfo(@User() user: UserJWT) {
    const data = await this.userService.findUserSettingInfo(user);
    return new ResponseTransformer({
      data,
      status: HttpStatus.OK,
      message: 'Success',
    });
  }

  @Get(`setting-channel`)
  async settingChannel(@User() user: UserJWT) {
    const data = await this.userService.findUserSettingChannel(user);
    return new ResponseTransformer({
      data,
      status: HttpStatus.OK,
      message: 'OK',
    });
  }

  @Post('channel')
  async createChannel(@Body() payload: RegisterProChannel, @User() user: UserJWT) {
    const channel = await this.userService.createChannel(payload, user);
    return new ResponseTransformer<RegisterChannelResponse>({
      message: 'Đăng ký kênh thành công',
      status: HttpStatus.OK,
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

  @Put('setting-channel')
  async updateChannel(@Body() payload: ChannelDto, @User() user: UserJWT) {
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

  @Patch('update-profile')
  async updateUserProfile(@Body() payload: UpdateUserProfileDto, @User() user: UserJWT) {
    if (payload.password) {
      payload.password = await verifyPassword(payload.password, payload.confirmPassword!);
    }
    await this.userService.updateUserInfoSetting(removeEmptyFields(payload), user.id);
    return new ResponseTransformer({
      message: 'Cập nhật thành công',
      status: HttpStatus.OK,
    });
  }

  @Post(`change-password`)
  changePassword(@User() user: UserJWT, @Body() dto: UserPasswordDTO) {
    return this.userService.changePassword(dto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
