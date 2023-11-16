import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShoesRefSize } from '../shoes-ref-size/shoesRefSize.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Shoes {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public price: number;

  @OneToOne(() => Category)
  @JoinColumn()
  public category: Category;

  @Column({ nullable: true })
  public material: string;

  @Column({ nullable: true })
  public vendor: string;

  @Column({ nullable: true })
  public company: string;

  @Column({ nullable: false })
  public isBetterSell: boolean;

  @Column({ nullable: false })
  public isNewArrival: boolean;

  @OneToMany(() => ShoesRefSize, (refSize) => refSize.shoes)
  refSizes: ShoesRefSize[];

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
