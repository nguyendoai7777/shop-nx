import type { CreateUserDto } from '@shop/dto';
import { Channel, SettingInfoRequestBody } from './channel.types.js';
import { Maybe } from './common.types.js';

export interface Streamer extends Omit<CreateUserDto, 'password' | 'confirmPassword'> {
  id: number;
  channelRef: Channel;
}

export interface UserQueryResponseSchema {
  lastname: string;
  firstname: string;
  username: string;
  email: string;
  channel: Maybe | string;
  verified: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  id: number;
  themeId: number | null;
}

export type UserEditSettingError = {
  [K in keyof SettingInfoRequestBody]?: string;
};
