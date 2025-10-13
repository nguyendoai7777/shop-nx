import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';
import { ResponseBase } from '@shop/type';
import { ResponseTransformer } from '@shop/factory';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseBase<T>> {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof ResponseTransformer) {
          return data.data;
        }
        return data;
      })
    );
  }
}
