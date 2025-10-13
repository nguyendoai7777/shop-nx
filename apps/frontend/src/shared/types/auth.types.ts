import type { CreateUserDto, LoginDto } from '@shop/dto';
import { AuthApiResponse, Prettify, ResponseBase } from '@shop/type';
import { FormChange } from './form.types';

export type LoginFormDto = Prettify<LoginDto>;
export type RegisterFormDto = Prettify<CreateUserDto>;

export type LoginAction = FormChange<LoginFormDto>;

export type RegisterAction = FormChange<RegisterFormDto>;

export interface AuthDialogProps {
  onClose?(): void;
  isRegister?: boolean;
}

export interface AuthResponse extends AuthApiResponse {
  /**
   * @desc ApiUrl
   * */
  api: string;
}

export interface AuthContextType {
  loading: boolean;
  setLoading: (state: boolean) => void;
  login(payload: LoginFormDto): Promise<ResponseBase<AuthResponse>>;
  register(payload: RegisterFormDto): Promise<ResponseBase<RegisterFormDto>>;
  logout(): void;
}
