import { Module } from '@nestjs/common';
import { Shoes } from './shoes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoesService } from './shoes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shoes])],
  controllers: [],
  providers: [ShoesService],
})
export class ShoesModule {}
