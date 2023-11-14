import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shoes } from '../shoes/shoes.entity';

@Entity()
export class ShoesRefSize {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public size: number;

  @Column({ nullable: false })
  public isAvailable: boolean;

  @ManyToOne(() => Shoes, (shoes) => shoes.refSizes)
  shoes: Shoes;
}
