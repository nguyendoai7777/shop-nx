import { RSBUser } from './user.types.js';

export interface AuthApiResponse {
  accessToken: string;
  refreshToken: string;
  user: RSBUser;
}
