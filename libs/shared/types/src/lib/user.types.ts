import { Channel, SettingInfoRequestBody } from './channel.types.js';
import { Maybe } from './common.types.js';
import { RSBDonor } from './donate.type.js';

export interface UserProfileImage {
  avatar?: string | null;
  banner?: string | null;
}

export interface UserQueryResponseSchema extends RSBDonor {
  email: string;
  username: string;
  channel: Maybe | string;
  verified: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  banner?: string | null;
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
