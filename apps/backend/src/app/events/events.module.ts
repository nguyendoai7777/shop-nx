import { Global, Module } from '@nestjs/common';
import { DonateGateway } from './donate.gateway';

@Global()
@Module({
  providers: [DonateGateway],
  exports: [DonateGateway],
})
export class EventsModule {}
