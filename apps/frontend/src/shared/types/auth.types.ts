import type { CreateUserDto, LoginDto } from '@shop/dto';
import { Prettify, ResponseBase } from '@shop/type';
import { UserFromDetail } from './user.types';
import { FormChange } from './form.types';

export type LoginFormDto = Prettify<LoginDto>;
export type RegisterFormDto = Prettify<CreateUserDto>;

export type LoginAction = FormChange<LoginFormDto>;

export type RegisterAction = FormChange<RegisterFormDto>;

export interface AuthDialogProps {
  onClose?(): void;
  isRegister?: boolean;
}


export interface AuthContextType {
  user: RegisterFormDto | undefined;
  loading: boolean;
  setUser(user: RegisterFormDto): void;
  login(payload: LoginFormDto): Promise<ResponseBase<UserFromDetail>>;
  register(payload: RegisterFormDto): Promise<ResponseBase<RegisterFormDto>>;
  logout(): void;
}
