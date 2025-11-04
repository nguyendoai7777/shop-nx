import { RSBUser } from './user.types.js';

export interface AuthApiResponse {
  accessToken: string;
  refreshToken: string;
  user: RSBUser;
}

export interface AuthLogin {
  username: string;
  password: string;
}
