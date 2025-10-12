import { ResponseBase } from '@shop/type';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export const CatchAxiosError = <T>(error: unknown) => {
  const e = error as AxiosError<ResponseBase<T>>;
  return NextResponse.json(e);
};

export class CatchAxiosInterceptorError<T> {
  constructor(
    public message: string,
    public data: T,
    public status: number,
    path: string
  ) {}
}
