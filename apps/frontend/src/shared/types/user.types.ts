import { UserInfoByJWT, UserInfoDTO } from '@shop/dto';

export interface UserFromLogin {
  accessToken: string;
  user: UserInfoDTO
}

export interface UserFromDetail {
  accessToken: string;
  user: UserInfoDTO
}