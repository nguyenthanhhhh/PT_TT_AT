import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { pick } from 'lodash';
import { In, Repository } from 'typeorm';
import { AddProductData, PaidCartData } from './dto/request.dto';
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
        isPaid: false,
        isVerify: false,
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
    return order;
  }

  async deleteProductInCart(user: any, orderId: number) {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
        isDeleted: false,
      },
    });

    if (!order)
      throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);

    await this.cartRepository
      .createQueryBuilder()
      .update(Cart)
      .set({ isDeleted: true })
      .where('orderId = :orderId', { orderId: order.id })
      .andWhere('userId = :userId', { userId: user.id })
      .andWhere('isDeleted = :isDeleted', { isDeleted: false })
      .execute();

    await this.orderRepository.update(order.id, {
      isDeleted: true,
      inCart: false,
    });

    return true;
  }

  async updateProductQuantityInCart(
    user: any,
    orderId: number,
    quantity: number,
  ) {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
        isDeleted: false,
      },
      relations: {
        shoes: true,
      },
    });

    if (!order)
      throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);

    const shoes = await this.shoesRepository.findOne({
      where: {
        id: order.shoes.id,
      },
    });

    if (!shoes)
      throw new HttpException('shoes not found!', HttpStatus.NOT_FOUND);

    const refSize = await this.shoesRefSizeRepository.findOne({
      where: {
        isDeleted: false,
        size: order.size,
        shoes: {
          id: order.shoes.id,
        },
      },
    });

    if (!refSize)
      throw new HttpException('refSize is not exist!', HttpStatus.NOT_FOUND);

    if (order.quantity + quantity <= 0)
      throw new HttpException('Quantity invalid!', HttpStatus.BAD_REQUEST);

    const cart = await this.cartRepository.findOne({
      where: {
        isDeleted: false,
        user: {
          id: user.id,
        },
        order: {
          id: order.id,
        },
      },
    });

    if (!cart) throw new HttpException('cart not found!', HttpStatus.NOT_FOUND);

    await this.orderRepository.update(order.id, {
      quantity: order.quantity + quantity,
      amount: order.amount + quantity * shoes.price,
    });
    await this.shoesRefSizeRepository.update(refSize.id, {
      quantity: refSize.quantity + -quantity,
    });
    return true;
  }

  async paidCart(user: any, paidCartData: PaidCartData) {
    const allOrderInCart = await this.cartRepository.find({
      where: {
        isDeleted: false,
        user: {
          id: user.id,
        },
      },
      relations: {
        order: true,
      },
    });

    const orderIdsInCart = allOrderInCart.map((i) => i.order.id);
    const orderIds = paidCartData.orderIds;

    orderIds.map((id) => {
      if (!orderIdsInCart.includes(id))
        throw new HttpException('OrderId invalid', HttpStatus.BAD_REQUEST);
    });

    const orders = await this.orderRepository.find({
      where: {
        id: In(orderIds),
        isPaid: false,
        isDeleted: false,
      },
    });

    Promise.all(
      orders.map(async (order) => {
        await this.orderRepository.update(order.id, {
          isPaid: true,
          inCart: false,
          description: paidCartData.description,
        });
      }),
    );

    return true;
  }
}
