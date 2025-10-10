import { UserQueryResponseSchema } from '@shop/type';

export interface UserFromDetail {
  accessToken: string;
  user: UserQueryResponseSchema;
}

export interface UserFromDetailClient extends UserFromDetail {
  api: string
}