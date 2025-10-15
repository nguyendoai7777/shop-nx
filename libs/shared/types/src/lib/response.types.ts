import { HttpStatus } from '@nestjs/common';
import { Prettify } from './common.types.js';
import { Pagination } from './pagination.types.js';

export interface ResponseBaseShape<T> {
  message: string;
  status: HttpStatus | (number & {});
  data?: T;
}

export type ResponseBase<T = void> = [T] extends [void]
  ? Prettify<Omit<ResponseBaseShape<T>, 'data'>>
  : Required<ResponseBaseShape<T>>;

export type ResponseWithPagination<T> = ResponseBase<T> & {
  pagination: Prettify<Pagination & { total: number }>;
};

// export type ResponseBaseClient<T = void> = Prettify<_ResponseBase<T>>
