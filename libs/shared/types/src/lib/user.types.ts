import { Channel, SettingInfoRequestBody } from './channel.types.js';
import { Maybe } from './common.types.js';

export interface RSBUserBase {
  id: number;
  firstname: string;
  lastname: string;
  avatar: string | null;
}

export interface UserProfileImage {
  avatar?: string | null;
  banner?: string | null;
}

export interface RSBUser extends RSBUserBase {
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

export interface Streamer extends RSBUser {
  channelRef: Channel;
}
