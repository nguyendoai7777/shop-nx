import type { CreateUserDto } from '@shop/dto';
import { Channel, SettingInfoRequestBody } from './channel.types.js';
import { Maybe } from './common.types.js';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface UserProfileImage {
  avatar?: string | null;
  banner?: string | null;
}

export interface UserQueryResponseSchema extends UserProfileImage {
  lastname: string;
  firstname: string;
  username: string;
  email: string;
  channel: Maybe | string;
  verified: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  id: number;
}

export type UserEditSettingError = {
  [K in keyof SettingInfoRequestBody]?: string;
};

export interface UserJWT {
  name: string;
  id: number;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

export interface Streamer extends UserQueryResponseSchema {
  channelRef: Channel;
}
