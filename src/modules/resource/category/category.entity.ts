import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public quantity: number;
}
