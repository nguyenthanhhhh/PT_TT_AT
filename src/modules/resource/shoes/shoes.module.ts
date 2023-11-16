import { Module } from '@nestjs/common';
import { Shoes } from './shoes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoesService } from './shoes.service';
import { Category } from '../category/category.entity';
import { ShoesRefSize } from '../shoes-ref-size/shoesRefSize.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shoes, Category, ShoesRefSize])],
  controllers: [],
  providers: [ShoesService],
  exports: [ShoesService],
})
export class ShoesModule {}
