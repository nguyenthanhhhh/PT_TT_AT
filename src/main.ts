import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSvc = app.get(ConfigService);
  const httpPort = configSvc.get('REST_PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Shoes')
    .setDescription('Shoes')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(httpPort);
}
bootstrap();
