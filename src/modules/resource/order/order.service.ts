/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { Repository } from 'typeorm';
import {
  LIMIT_DEFAULT,
  OFFSET_DEFAULT,
} from '../../../common/const/general.const';
import {
  differenceInMinutes,
  signData,
  validateData,
} from '../../../common/helper/sqrc';
import { ShoesRefSize } from '../shoes-ref-size/shoesRefSize.entity';
import { Shoes } from '../shoes/shoes.entity';
import { AddOrderData, PaymentOrder } from './dto/request.dto';
import { Order } from './order.entity';

const PI_Merchant = {
  cardNumber: '4000123412345678',
  nameOnCard: 'Shoe Zone',
  expired: '06/2028',
  securityCode: '456',
};

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

  async getOrderByUser(user: any) {
    const take = Number(LIMIT_DEFAULT);
    const skip = Number(OFFSET_DEFAULT);

    const [orders, total] = await this.orderRepository.findAndCount({
      where: {
        isDeleted: false,
        inCart: false,
        isPaid: true,
        user: {
          id: user.id,
        },
      },
      relations: {
        user: true,
        shoes: true,
      },
      take,
      skip,
      order: {
        createdAt: 'DESC',
      },
    });
    return { total, limit: take, offset: skip, data: orders };
  }

  async createSQRC(user: any, orderData: AddOrderData) {
    const shoes = await this.shoesRepository.findOne({
      where: {
        isDeleted: false,
        id: orderData.OI.shoesId,
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
        size: orderData.OI.size,
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

    const amount = Number(shoes.price * orderData.OI.quantity);

    const timestamp = new Date();

    const isIntactData = validateData({
      PIMD: orderData.PIMD,
      OI: orderData.OI,
      signature: orderData.S,
    });

    if (!isIntactData) return 0;
    const order = this.orderRepository.create({
      ...pick(orderData.OI, 'quantity', 'size', 'description'),
      amount,
      isPaid: false,
      timestamp,
      isVerify: false,
      user,
      shoes,
      inCart: false,
    });

    await this.orderRepository.save(order);
    await this.shoesRefSizeRepository.update(refSize.id, {
      quantity: refSize.quantity - orderData.OI.quantity,
    });

    const OI_data = {
      id: order.id,
      quantity: order.quantity,
      size: order.size,
      amount: order.amount,
      timestamp: order.timestamp,
      shoes: { ...pick(order.shoes, 'name', 'price', 'vendor') },
    };
    const H = {
      PI_Merchant,
      OI_data,
      PIMD_Buyer: orderData.PIMD,
    };

    const signature = signData(H);

    const SQRCData = {
      PI_Merchant,
      OI: OI_data,
      PIMD: orderData.PIMD,
      signature,
    };

    return SQRCData;
  }

  async orderPayment(data: PaymentOrder) {
    const order = await this.orderRepository.findOne({
      where: {
        id: Number(data.id),
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

    if (order.isPaid) {
      throw new HttpException('Qr has been paid', HttpStatus.BAD_REQUEST);
    }

    const currentTime = new Date(); // Lấy thời gian hiện tại
    const orderTimestamp = new Date(order.timestamp); // Lấy thời gian từ trường timestamp của order
    const diffInMinutes = differenceInMinutes(currentTime, orderTimestamp); // Tính chênh lệch thời gian

    if (diffInMinutes > 5) {
      throw new HttpException('QR code has expired', HttpStatus.BAD_REQUEST);
    }

    order.isPaid = true;
    order.description = 'Payment success';
    await this.orderRepository.save(order);

    return order;
  }

  async updateTimestamp(orderId: string) {
    const order = await this.orderRepository.findOne({
      where: {
        id: Number(orderId),
        isDeleted: false,
      },
      relations: {
        user: true,
        shoes: true,
      },
    });

    // Lấy thời gian hiện tại từ timestamp và cộng thêm 5 phút
    const currentTimestamp = new Date();
    const newTimestamp = new Date(currentTimestamp.getTime() + 5 * 60 * 1000);

    order.timestamp = newTimestamp;

    // Lưu lại thay đổi
    await this.orderRepository.save(order);

    return order;
  }

  async verifyOrderCms(orderId: number) {
    const order = await this.orderRepository.findOne({
      where: {
        isDeleted: false,
        id: orderId,
        isPaid: true,
        isVerify: false,
      },
    });

    if (!order) {
      throw new HttpException('order not found', HttpStatus.NOT_FOUND);
    }

    await this.orderRepository.update(order.id, {
      isVerify: true,
    });

    return true;
  }
}
