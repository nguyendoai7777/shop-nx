import type { CreateUserDto, LoginDto } from '@shop/dto';
import { Prettify } from '@shop/type';
import type { UserInfoByJWT } from '@shop/dto';

export type LoginFormDto = Prettify<LoginDto>;
export type RegisterFormDto = Prettify<CreateUserDto>;

export interface FormChange<T> {
  valueChange(value: T): void;
}

export type LoginAction = FormChange<LoginFormDto>;

export type RegisterAction = FormChange<RegisterFormDto>;

export interface AuthDialogProps {
  onClose?(): void;
  isRegister?: boolean;
}

export type UserInfo = Omit<UserInfoByJWT, 'iat' | 'exp'> | RegisterFormDto;

export interface AuthContextType {
  user: UserInfo | undefined;
  loading: boolean;
  setUser(user: UserInfo): void;
  login<T = any>(payload: LoginFormDto): Promise<T>;
  logout(): void;
  register<T = any>(payload: RegisterFormDto): Promise<T>;
}
