import { Pagination, Prettify, ResponseBase } from '@shop/type';

export interface ResponseWithPagination<T> extends ResponseBase<T> {
  pagination: Prettify<Pagination & { total: number }>;
}
