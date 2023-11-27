import { Module } from '@nestjs/common';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { User } from '../user/user.entity';
import { Shoes } from '../shoes/shoes.entity';
import { ShoesRefSize } from '../shoes-ref-size/shoesRefSize.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Shoes, ShoesRefSize])],
  controllers: [],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
