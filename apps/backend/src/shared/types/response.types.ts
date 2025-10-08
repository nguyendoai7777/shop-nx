import { Pagination, Prettify, ResponseBase } from '@shop/type';

export type ResponseWithPagination<T> =
  ResponseBase<T> & {
  pagination: Prettify<Pagination & { total: number }>;
};