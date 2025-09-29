/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter, ResponseExceptionFilter } from '@filters';
import { ResponseInterceptor } from '@interceptors';
import { WTLogger } from '@loggers';
import { configDotenv } from 'dotenv';

configDotenv({
  path: '/.env',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new ResponseExceptionFilter(),
    new PrismaClientExceptionFilter()
  );
  app.useLogger(new WTLogger());
  app.useGlobalInterceptors(new ResponseInterceptor());
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  app.enableCors({});

  const config = new DocumentBuilder()
    .setTitle('Shop app api')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
