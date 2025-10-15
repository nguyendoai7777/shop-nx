import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResponseTransformer } from '@shop/factory';
import chalk from 'chalk';

@Catch(BadRequestException)
export class ResponseExceptionFilter<T> implements ExceptionFilter {
  constructor() {}
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    let errorMess: any;
    const isBadRequestFilter = (exception.getResponse() as BadRequestException).message;
    const tryAsResponseTransformer = (exception.getResponse() as any).response;
    console.log(`<=====================>`);
    console.log(chalk.bold.hex('#ff1493')`@BadRequestException`, exception.getResponse());
    if (tryAsResponseTransformer instanceof ResponseTransformer) {
      console.log(chalk.bold.hex('#ff1493')`@@ Case 1`);
      errorMess = tryAsResponseTransformer.data;
    } else if (Array.isArray(isBadRequestFilter)) {
      // bắt lỗi validator từ class-validator
      console.log(chalk.bold.hex('#ff1493')`@@ Case 2`);
      const errors = isBadRequestFilter as unknown as string[];
      const validationMap: Record<string, string> = {};
      for (const msg of errors) {
        const parts = msg.split(' ');
        const key = parts.shift()!;
        validationMap[key] = parts.join(' ').trim();
      }

      errorMess = {
        message: 'update failed',
        data: validationMap,
        status: HttpStatus.BAD_REQUEST,
      };
    } else {
      console.log(chalk.bold.hex('#ff1493')`@@ Case else`);
      errorMess = {
        message: exception.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }

    res.status(HttpStatus.BAD_REQUEST).json(errorMess);
  }
}
