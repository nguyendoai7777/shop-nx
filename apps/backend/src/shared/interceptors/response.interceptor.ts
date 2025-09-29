import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { ResponseBase } from '@types';
import { ResponseTransformer } from '@transformers';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseBase<T>>
{
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp(),
      req = ctx.getRequest(),
      md = req;
    return next.handle().pipe(
      map((data) => {
        console.log(`@@ class transform`, data instanceof ResponseTransformer, data);

        if(data instanceof ResponseTransformer) {
          return data.data
        }
        return data
      })
    );
  }
}
