import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shoes } from '../shoes/shoes.entity';

@Entity()
export class ShoesRefSize {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public size: number;

  @Column({ nullable: false })
  public quantity: number;

  @ManyToOne(() => Shoes, (shoes) => shoes.refSizes)
  shoes: Shoes;

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
