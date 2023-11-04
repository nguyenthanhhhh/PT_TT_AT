import { Module } from '@nestjs/common';
import { loadConfig } from './config';
import { DatabaseModule } from './modules/resource/database/database.module';

@Module({
  imports: [loadConfig(), DatabaseModule],
})
export class AppModule {}
