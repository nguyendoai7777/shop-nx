/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter, ResponseExceptionFilter } from '@filters';
import { ResponseInterceptor } from '@interceptors';
import { configDotenv } from 'dotenv';
import { NoCacheInterceptor } from './shared/interceptors/no-cache.interceptor';
import { NotFoundFilter } from './shared/filters/notfound-exception/notfound-exception.filter';
import chalk from 'chalk';
import { Purple } from './shared/constants/color.const';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';

configDotenv({
  path: '/.env',
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ResponseExceptionFilter(), new PrismaClientExceptionFilter(), new NotFoundFilter());
  // app.useLogger(new WTLogger());
  app.useGlobalInterceptors(new NoCacheInterceptor(), new ResponseInterceptor());
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  app.enableCors({});
  // app.useStaticAssets(join(__dirname, '../public'), {prefix: '/public'});
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
