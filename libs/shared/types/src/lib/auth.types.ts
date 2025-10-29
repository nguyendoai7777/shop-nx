import { RSBUser } from './user.types.js';

export interface AuthApiResponse {
  accessToken: string;
  user: RSBUser;
}
