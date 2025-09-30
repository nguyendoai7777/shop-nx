import type { UserInfoByJWT } from '@shop/dto';
import { LoginFormDto, RegisterFormDto } from '@types';

export type UserInfo = Omit<UserInfoByJWT, 'iat' | 'exp'>;

export interface AuthContextType {
  user: UserInfo | undefined;
  loading: boolean;
  setUser(user: UserInfo): void;
  login<T = any>(payload: LoginFormDto): Promise<T>;
  logout(): void;
  register<T = any>(payload: RegisterFormDto): Promise<T>;
}
