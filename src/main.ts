import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://shoe-zone.vercel.app', 'http://127.0.0.1:6263'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  const configSvc = app.get(ConfigService);
  const httpPort = configSvc.get('REST_PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Shoes')
    .setDescription('Shoes')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(httpPort, '0.0.0.0');
}
bootstrap();
