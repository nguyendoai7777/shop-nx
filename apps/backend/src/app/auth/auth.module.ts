import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env['SECRET_KEY'],
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

/*

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksInVzZXJuYW1lIjoic2hhcmtiaW5oIiwiZW1haWwiOiJzaGFya2JpbmhAZ21haWwuY29tIiwiaWF0IjoxNzYwNjgyMzMxLCJleHAiOjE3NjEyODcxMzF9.oQgl1fUH4v5pdg_0FQPCY9ZrLFp1FK5EDGrz5poWbEg

*/
