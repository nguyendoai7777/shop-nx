import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseTransformer } from '@transformers';
import { WTLogger } from '@loggers';

@Catch(BadRequestException)
export class ResponseExceptionFilter<T> implements ExceptionFilter {
  constructor() {}
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    let errorMess: any;
    const isBadRequestFilter = (exception.getResponse() as BadRequestException).message;
    if (exception.getResponse() instanceof ResponseTransformer) {
      errorMess = (exception.getResponse() as ResponseTransformer<T>).data;
    } else if (Array.isArray(isBadRequestFilter)) {
      const errors = (isBadRequestFilter) as unknown as string[];
      // console.log(`@@ ey, `, errors);
      errorMess = {
        message: errors.length ? errors[0] : exception.message,
        status: HttpStatus.BAD_REQUEST,
      };
    } else {
      // console.log(`@@ ua ??? `);
      errorMess = {
        message: exception.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }

    console.log(`@@ Filter exception`, errorMess);

    res.status(HttpStatus.BAD_REQUEST).json(errorMess);
  }
}
