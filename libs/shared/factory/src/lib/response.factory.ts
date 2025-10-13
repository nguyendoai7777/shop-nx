import { ResponseBase, ResponseWithPagination } from '@shop/type';

export class ResponseTransformer<T = void> {
  constructor(protected option: ResponseBase<T>) {}

  get data() {
    return this.option;
  }
}

export class ResponsePaginationTransformer<T> extends ResponseTransformer<T> {
  constructor(public override option: ResponseWithPagination<T>) {
    super(option);
  }
}
