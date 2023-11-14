import { Module } from '@nestjs/common';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
