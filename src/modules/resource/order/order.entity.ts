import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Shoes } from '../shoes/shoes.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => Shoes, (shoes) => shoes.order)
  shoes: Shoes;

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

  @Column({ nullable: true, default: false })
  public inCart: boolean;

  @Column({ nullable: true, type: 'jsonb' })
  description: any;

  @Column({ nullable: false, type: 'boolean', default: false })
  public isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  public updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
