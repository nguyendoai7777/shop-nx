import { HttpStatus } from '@nestjs/common';

export interface ResponseBase<T> {
  message: string;
  data?: T;
  status: HttpStatus | (number & {});
}
