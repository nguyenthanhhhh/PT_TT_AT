import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';

@Module({
  imports: [],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
