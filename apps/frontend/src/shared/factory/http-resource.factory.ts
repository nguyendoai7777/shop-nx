import { AxiosError, AxiosResponse } from 'axios';

interface HttpResourceCaller<T = {}> {
  next?(data: T): void;
  error?(err: T): void;
  /**
   * truyền lại response bất kể thành công hay thất bại
   * */
  origin?(response: AxiosResponse<T>): void;
}

class HttpResource<T> {
  constructor(private resource: Promise<AxiosResponse<T>>) {}
  subscribe(caller: HttpResourceCaller<T>): void;

  // Overload 2: callbacks
  subscribe(
    next?: (data: T) => void,
    error?: (err: T) => void,
    origin?: (response: AxiosResponse<T> | undefined) => void
  ): void;

  subscribe(
    arg1?: HttpResourceCaller<T> | ((data: T) => void),
    arg2?: (err: T) => void,
    arg3?: (response: AxiosResponse<T> | undefined) => void
  ): void {
    this.resource
      .then((res) => {
        if (typeof arg1 === "function") {
          arg1(res.data);
          arg3?.(res);
        } else {
          arg1?.next?.(res.data);
          arg1?.origin?.(res);
        }
      })
      .catch((err: AxiosError<T>) => {
        const errData = (err.response?.data ?? {}) as T;
        if (typeof arg1 === "function") {
          arg2?.(errData);
          arg3?.(err.response);
        } else {
          arg1?.error?.(errData);
          arg1?.origin?.(err.response!);
        }
      });
  }
}

export function httpResource<T>(resource: Promise<AxiosResponse<T>>) {
  return new HttpResource<T>(resource);
}

export async function httpResourceAsync<T>(
  resource: Promise<AxiosResponse<T>>
): Promise<{
  data?: T;
  error?: T;
  response?: AxiosResponse<T>;
}> {
  try {
    const res = await resource;
    return {
      data: res.data,
      response: res,
    };
  } catch (err) {
    const axiosErr = err as AxiosError<T>;
    return {
      error: (axiosErr.response?.data ?? {}) as T,
      response: axiosErr.response,
    };
  }
}