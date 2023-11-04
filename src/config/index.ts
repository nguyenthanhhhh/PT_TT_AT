import { ConfigModule } from '@nestjs/config';

export function loadConfig() {
  return ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV,
  });
}
