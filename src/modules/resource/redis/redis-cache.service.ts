import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import {
  DEFAULT_TTL,
  SCAN_STREAM_COUNT,
} from '../../../common/const/redis.const';

@Injectable()
export class RedisCacheService implements OnModuleInit {
  private redisClient: Redis;
  constructor(private readonly configService: ConfigService) {}

  async connectRedis() {
    console.log('Connect to redis...');

    this.redisClient = new Redis(this.configService.get('REDIS_URI'));

    console.log('Connect to Redis successful!');
  }

  async onModuleInit() {
    await this.connectRedis();
  }

  async get(key: string) {
    const data = await this.redisClient.get(key);
    if (data) return JSON.parse(data);
    return false;
  }

  async set(key: string, value: any, ttl?: number) {
    return this.redisClient.set(
      key,
      JSON.stringify(value),
      'PX',
      ttl || DEFAULT_TTL,
    );
  }

  async scanAndDelete(pattern) {
    const stream = this.redisClient.scanStream({
      match: pattern,
      count: SCAN_STREAM_COUNT,
    });

    stream.on('data', (keys) => {
      if (keys.length) {
        const pipeline = this.redisClient.pipeline();
        keys.forEach((key) => {
          pipeline.del(key);
        });
        pipeline.exec();
      }
    });

    stream.on('end', () => {
      console.log('Clear cache done with parttern ', pattern);
    });
    return true;
  }
}
