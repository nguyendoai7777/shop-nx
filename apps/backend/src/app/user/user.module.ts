import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PageLogoService } from '@services';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PageLogoService],
})
export class UserModule {}
