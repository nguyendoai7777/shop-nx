import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IncomingMessage } from 'node:http';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req.user?.[data] : req.user;
  }
);
