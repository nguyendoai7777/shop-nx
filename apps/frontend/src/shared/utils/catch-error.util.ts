import { AxiosError } from 'axios';
import { ResponseBase } from '@shop/type';
import { NextResponse } from 'next/server';

export const CatchAxiosError = <T>(error: unknown) => {
  const e = error as AxiosError<ResponseBase<T>>;
  return NextResponse.json(e.response?.data);
};

export class CatchAxiosInterceptorError<T> {
  constructor(public message: string, public data: T, public status: number, path: string) {}
}
