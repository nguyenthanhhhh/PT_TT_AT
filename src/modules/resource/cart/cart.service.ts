import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { pick } from 'lodash';
import { Repository } from 'typeorm';
import { AddProductData } from './dto/request.dto';
import { Order } from '../order/order.entity';
import { Shoes } from '../shoes/shoes.entity';
import { ShoesRefSize } from '../shoes-ref-size/shoesRefSize.entity';
import {
  LIMIT_DEFAULT,
  OFFSET_DEFAULT,
} from '../../../common/const/general.const';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Shoes)
    private readonly shoesRepository: Repository<Shoes>,
    @InjectRepository(ShoesRefSize)
    private readonly shoesRefSizeRepository: Repository<ShoesRefSize>,
  ) {}

  async getOrderInCart(userId: number) {
    const take = Number(LIMIT_DEFAULT);
    const skip = Number(OFFSET_DEFAULT);

    const orders = await this.orderRepository.find({
      where: {
        user: { id: userId },
        isDeleted: false,
        inCart: true,
      },
      relations: {
        shoes: true,
        user: true,
      },
      take,
      skip,
    });

    return orders;
  }

  async addProductToCart(user: any, addProductData: AddProductData) {
    const shoes = await this.shoesRepository.findOne({
      where: { id: addProductData.shoesId, isDeleted: false },
    });

    if (!shoes)
      throw new HttpException('Shoes not found', HttpStatus.NOT_FOUND);

    const query = this.shoesRefSizeRepository
      .createQueryBuilder('rs')
      .where('rs.shoesId = :shoesId', {
        shoesId: shoes.id,
      })
      .andWhere('rs.size = :size', {
        size: addProductData.size,
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

    const amount = Number(shoes.price * addProductData.quantity);
    const order = this.orderRepository.create({
      ...pick(addProductData, 'quantity', 'size'),
      amount,
      isPaid: false,
      isVerify: false,
      user,
      shoes,
      inCart: true,
    });

    await this.orderRepository.save(order);
    const cart = this.cartRepository.create({
      order,
      user,
    });
    await this.cartRepository.save(cart);
    await this.shoesRefSizeRepository.update(refSize.id, {
      quantity: refSize.quantity - addProductData.quantity,
    });
    return true;
  }
}
