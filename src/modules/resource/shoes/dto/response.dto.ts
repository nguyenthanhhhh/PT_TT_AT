import { IsNumber } from 'class-validator';

export class GetShoesData {
  @IsNumber()
  id: number;

  @IsNumber()
  price: number;

  @IsNumber()
  material: string;

  @IsNumber()
  vendor: string;

  @IsNumber()
  company: string;

  @IsNumber()
  isBetterSell: boolean;

  @IsNumber()
  isNewArrival: boolean;

  @IsNumber()
  categoryId: number;
}
