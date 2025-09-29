import { HttpStatus } from '@nestjs/common';
import { CastString, Prettify } from './common.types';
import { Pagination } from './pagination.types';
import type { ResponseMessage } from '@constants';

export interface ResponseBase<T> {
  message: CastString<ResponseMessage>;
  data?: T;
  status: HttpStatus | (number & {});
}

export interface ResponseWithPagination<T> extends ResponseBase<T> {
  pagination: Prettify<Pagination & { total: number }>;
}
