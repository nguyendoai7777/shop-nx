import { UserInfoByJWT } from '@shop/dto';

export type UserInfo = Omit<UserInfoByJWT, 'iat' | 'exp'>;

export type AuthContextType = {
  user: UserInfo | undefined;
  setUser: (user: UserInfo) => void;
  loading: boolean;
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
};
