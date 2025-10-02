import { Module } from '@nestjs/common';
import { StreamerController } from './streamer.controller';
import { UserService } from '../user/user.service';

@Module({
  controllers: [StreamerController],
  providers: [UserService],
})
export class StreamerModule {}
