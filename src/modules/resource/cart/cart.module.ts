import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { Order } from '../order/order.entity';
import { Shoes } from '../shoes/shoes.entity';
import { ShoesRefSize } from '../shoes-ref-size/shoesRefSize.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, Order, Shoes, ShoesRefSize])],
  controllers: [],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
