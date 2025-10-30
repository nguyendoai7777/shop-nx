import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { c } from '@utils';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const extractMess = exception.getResponse() as { message: string; statusCode: number };
    console.log(c.bold.red.underline`@@ UnauthorizedExceptionFilter`, extractMess);
    const res = host.switchToHttp().getResponse<Response>();
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: extractMess?.message ?? 'Unauthorized', code: HttpStatus.UNAUTHORIZED });
  }
}
