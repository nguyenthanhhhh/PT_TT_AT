import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoesRefSize } from './shoesRefSize.entity';
import { ShoesRefSizeService } from './shoesRefSize.service';
import { Shoes } from '../shoes/shoes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoesRefSize, Shoes])],
  controllers: [],
  providers: [ShoesRefSizeService],
})
export class ShoesRefSizeModule {}
