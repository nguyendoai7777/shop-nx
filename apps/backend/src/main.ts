/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  NotFoundFilter,
  PrismaClientExceptionFilter,
  ResponseExceptionFilter,
  UnauthorizedExceptionFilter,
} from '@filters';
import { NoCacheInterceptor, ResponseInterceptor } from '@interceptors';
import { configDotenv } from 'dotenv';
import chalk from 'chalk';
import { Purple } from '@constants';
import { NestExpressApplication } from '@nestjs/platform-express';

configDotenv({
  path: '/.env',
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new ResponseExceptionFilter(),
    new PrismaClientExceptionFilter(),
    new NotFoundFilter(),
    new UnauthorizedExceptionFilter()
  );
  app.useGlobalInterceptors(new NoCacheInterceptor(), new ResponseInterceptor());
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
  console.log(
    chalk.yellow.bold`🚀 Application is running on: `,
    chalk.hex(Purple).underline.bold(`http://localhost:${port}/${globalPrefix}`)
  );
}

bootstrap();
