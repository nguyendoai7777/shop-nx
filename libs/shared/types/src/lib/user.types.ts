import type { CreateUserDto } from '@shop/dto';
import { Channel } from './channel.types.js';

export interface Streamer extends Omit<CreateUserDto, 'password' | 'confirmPassword'> {
  id: number;
  channelRef: Channel;
}

export interface UserQueryResponseSchema {
  lastname: string;
  firstname: string;
  username: string;
  email: string;
  channel: string | null;
  verified: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  id: number;
  themeId: number | null;
}
