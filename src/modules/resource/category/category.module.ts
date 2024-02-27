import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { Shoes } from '../shoes/shoes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Shoes])],
  controllers: [],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
