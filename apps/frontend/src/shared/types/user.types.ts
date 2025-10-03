import { type CreateUserDto } from '@shop/dto';

export interface UserFromDetail {
  accessToken: string;
  user: CreateUserDto;
}

export interface UserFromDetailClient extends UserFromDetail {
  api: string
}