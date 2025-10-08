import { AxiosError, AxiosResponse } from 'axios';

interface HttpResourceCaller<R = {}, V = AxiosResponse> {
  next?(res: R): void;
  error?(err: R): void;
  /**
   * truyền lại response bất kể thành công hay thất bại
   * */
  origin?(response: V): void;
}

class HttpResource<R> {
  constructor(private resource: Promise<AxiosResponse<R>>) {}
  subscribe(caller: HttpResourceCaller<R>): void;

  // Overload 2: callbacks
  subscribe(next?: (data: R) => void, error?: (err: R) => void, origin?: (response: AxiosResponse<R> | undefined) => void): void;

  subscribe(
    arg1?: HttpResourceCaller<R> | ((data: R) => void),
    arg2?: (err: R) => void,
    arg3?: (response: AxiosResponse<R> | undefined) => void
  ) {
    this.resource
      .then((res) => {
        if (typeof arg1 === 'function') {
          arg1(res.data);
          arg3?.(res);
        } else {
          arg1?.next?.(res.data);
          arg1?.origin?.(res);
        }
      })
      .catch((err: AxiosError<R>) => {
        const errData = (err.response?.data ?? {}) as R;
        if (typeof arg1 === 'function') {
          arg2?.(errData);
          arg3?.(err.response);
        } else {
          arg1?.error?.(errData);
          arg1?.origin?.(err.response!);
        }
      });
  }
}

export function httpResource<R>(resource: Promise<AxiosResponse<R>>) {
  return new HttpResource<R>(resource);
}

export async function httpResourceAsync<R>(resource: Promise<AxiosResponse<R>>): Promise<{
  data?: R;
  error?: R;
  response?: AxiosResponse<R>;
}> {
  try {
    const res = await resource;
    return {
      data: res.data,
      response: res,
    };
  } catch (err) {
    const axiosErr = err as AxiosError<R>;
    return {
      error: (axiosErr.response?.data ?? {}) as R,
      response: axiosErr.response,
    };
  }
}
