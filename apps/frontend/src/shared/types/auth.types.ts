import type { CreateUserDto, LoginDto } from '@shop/dto';
import { Prettify } from '@shop/type';

export type LoginFormDto = Prettify<LoginDto>;
export type RegisterFormDto = Prettify<CreateUserDto>;

export interface FormChange<T> {
  valueChange(value: T): void;
}

export type LoginAction  = FormChange<LoginFormDto>

export type RegisterAction = FormChange<RegisterFormDto>

export interface AuthDialogProps {
  onClose?(): void
  isRegister?: boolean
}