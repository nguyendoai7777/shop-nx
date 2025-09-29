import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prismax/client';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
