import type { CreateUserDto } from '@shop/dto';
import { Channel } from './channel.types.js';

export interface Streamer extends Omit<CreateUserDto, 'password' | 'confirmPassword'> {
  id: number
  channelRef: Channel
}