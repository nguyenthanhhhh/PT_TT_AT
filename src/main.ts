import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  const configSvc = app.get(ConfigService);
  const httpPort = configSvc.get('REST_PORT');

  await app.listen(httpPort);
}
bootstrap();
