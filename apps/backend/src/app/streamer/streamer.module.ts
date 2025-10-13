import { Module } from '@nestjs/common';
import { StreamerController } from './streamer.controller';
import { StreamerService } from './streamer.service';

@Module({
  imports: [],
  controllers: [StreamerController],
  providers: [StreamerService],
})
export class StreamerModule {}
