import { ResponseBase, ResponseWithPagination } from '@types';

export class ResponseTransformer<T> {
  constructor(public option: ResponseBase<T>) {}

  get data() {
    return this.option;
  }
}

export class ResponsePaginationTransformer<T> extends ResponseTransformer<T> {
  constructor(public override option: ResponseWithPagination<T>) {
    super(option);
  }
}