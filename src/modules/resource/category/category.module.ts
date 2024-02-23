import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { Shoes } from '../shoes/shoes.entity';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Shoes]), RedisCacheModule],
  controllers: [],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
