import { LoggerService } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';

const { combine, label, colorize, simple } = format;

export class WTLogger implements LoggerService {
  logger: Logger;
  constructor() {
    this.logger = createLogger({
      format: combine(colorize(), simple()),
      transports: [new transports.Console()],
    });
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...this._meta(optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...this._meta(optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...this._meta(optionalParams));
  }

  debug?(message: any, ...optionalParams: any[]) {
    // nếu bạn muốn hỗ trợ debug
    this.logger.debug?.(message, ...this._meta(optionalParams));
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose?.(message, ...this._meta(optionalParams));
  }

  // Helper để chuyển optionalParams thành object metadata nếu cần
  private _meta(optionalParams: any[]): any {
    if (!optionalParams || optionalParams.length === 0) {
      return [];
    }
    // Nếu chỉ 1 param mà là object (metadata), truyền thẳng
    if (optionalParams.length === 1 && typeof optionalParams[0] === 'object') {
      return [optionalParams[0]];
    }
    // Ngược lại gói vào mảng (winston sẽ gán như metadata.splat)
    return [{ splat: optionalParams }];
  }
}
