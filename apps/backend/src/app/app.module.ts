import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticlesModule } from './articles/articles.module';
import { PrismaClientModule } from '@services';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { StreamingModule } from './streaming/streaming.module';
import { StreamerModule } from './streamer/streamer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
    PrismaClientModule,
    UserModule,
    ArticlesModule,
    AuthModule,
    StreamingModule,
    StreamerModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService, { name: APP_GUARD, provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
