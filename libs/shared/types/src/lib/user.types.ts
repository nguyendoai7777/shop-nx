import type { CreateUserDto } from '@shop/dto';

export interface Streamer extends Omit<CreateUserDto, 'password' | 'confirmPassword'> {
  id: number
}