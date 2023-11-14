import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Order } from '../order/order.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: number;

  @OneToOne(() => Order)
  @JoinColumn()
  order: number;
}
