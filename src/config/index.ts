import { ConfigModule } from '@nestjs/config';
// import CryptoJS from 'crypto-js';

export function loadConfig() {
  return ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV,
  });
}
