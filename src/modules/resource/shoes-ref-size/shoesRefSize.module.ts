import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoesRefSize } from './shoesRefSize.entity';
import { ShoesRefSizeService } from './shoesRefSize.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShoesRefSize])],
  controllers: [],
  providers: [ShoesRefSizeService],
})
export class ShoesRefSizeModule {}
