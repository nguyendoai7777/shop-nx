import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData() {
    return { message: 'Hello API, OKEE nhe', status: 200, ok: true };
  }
}
