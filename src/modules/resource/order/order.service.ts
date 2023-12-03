import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { pick } from 'lodash';
import {
  LIMIT_DEFAULT,
  OFFSET_DEFAULT,
} from '../../../common/const/general.const';
import { AddOrderData } from './dto/request.dto';
import { Shoes } from '../shoes/shoes.entity';
import { ShoesRefSize } from '../shoes-ref-size/shoesRefSize.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Shoes)
    private readonly shoesRepository: Repository<Shoes>,
    @InjectRepository(ShoesRefSize)
    private readonly shoesRefSizeRepository: Repository<ShoesRefSize>,
  ) {}

  async getOrderCms() {
    const take = Number(LIMIT_DEFAULT);
    const skip = Number(OFFSET_DEFAULT);

    const [orders, total] = await this.orderRepository.findAndCount({
      where: {
        isDeleted: false,
        inCart: false,
      },
      relations: {
        user: true,
        shoes: true,
      },
      take,
      skip,
      order: {
        id: 'ASC',
      },
    });
    return { total, limit: take, offset: skip, data: orders };
  }

  async getOrderDetail(id: number) {
    const order = await this.orderRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
      relations: {
        user: true,
        shoes: true,
      },
    });

    if (!order) {
      throw new HttpException('order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async addOrder(user: any, addOrderData: AddOrderData) {
    const shoes = await this.shoesRepository.findOne({
      where: {
        isDeleted: false,
        id: addOrderData.shoesId,
      },
    });

    if (!shoes)
      throw new HttpException('Shoes not found', HttpStatus.NOT_FOUND);

    const query = this.shoesRefSizeRepository
      .createQueryBuilder('rs')
      .where('rs.shoesId = :shoesId', {
        shoesId: shoes.id,
      })
      .andWhere('rs.size = :size', {
        size: addOrderData.size,
      })
      .andWhere('rs.quantity > :value', {
        value: 0,
      })
      .andWhere('rs.isDeleted = :isDeleted', {
        isDeleted: false,
      });

    const refSize = await query.getOne();

    if (!refSize)
      throw new HttpException(
        'Size is not exist or is not enough quantity',
        HttpStatus.NOT_FOUND,
      );

    const amount = Number(shoes.price * addOrderData.quantity);
    const order = this.orderRepository.create({
      ...pick(addOrderData, 'quantity', 'size'),
      amount,
      isPaid: true,
      isVerify: false,
      user,
      shoes,
      inCart: false,
    });

    await this.orderRepository.save(order);
    await this.shoesRefSizeRepository.update(refSize.id, {
      quantity: refSize.quantity - addOrderData.quantity,
    });
    return true;
  }
}
