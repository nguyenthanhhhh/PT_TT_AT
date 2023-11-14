import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
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
  public category: number;

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
}
