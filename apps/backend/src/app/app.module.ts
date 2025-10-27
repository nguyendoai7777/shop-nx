import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaClientModule } from '@services';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { StreamerModule } from './streamer/streamer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { MediaModule } from './media/media.module';
import { WalletModule } from './wallet/wallet.module';
import { DonationModule } from './donation/donation.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
    PrismaClientModule,
    EventsModule,
    UserModule,
    AuthModule,
    StreamerModule,
    MediaModule,
    WalletModule,
    DonationModule,
  ],
  controllers: [AppController],
  providers: [AppService, { name: APP_GUARD, provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
