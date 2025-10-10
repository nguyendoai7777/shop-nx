import { UserQueryResponseSchema } from './user.types.js';

export interface AuthApiResponse {
  accessToken: string;
  user: UserQueryResponseSchema
}