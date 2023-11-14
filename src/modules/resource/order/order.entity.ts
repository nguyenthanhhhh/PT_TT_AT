import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Shoes } from '../shoes/shoes.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: number;

  @OneToOne(() => Shoes)
  @JoinColumn()
  shoes: number;

  @Column({ nullable: false })
  public size: number;

  @Column({ nullable: false })
  public quantity: number;

  @Column({ nullable: false })
  public amount: number;

  @Column({ nullable: false })
  public isPaid: boolean;

  @Column({ nullable: false })
  public isVerify: boolean;
}
