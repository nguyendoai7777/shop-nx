import { HttpStatus } from '@nestjs/common';

export interface ResponseBaseShape<T> {
  message: string;
  status: HttpStatus | (number & {});
  data?: T;
}


export type ResponseBase<T = void> =
  [T] extends [void]
    ? Omit<ResponseBaseShape<T>, 'data'>
    : Required<ResponseBaseShape<T>>;


// export type ResponseBaseClient<T = void> = Prettify<_ResponseBase<T>>