import { IsNumber } from 'class-validator';

export class AddProductData {
  @IsNumber()
  shoesId: number;

  @IsNumber()
  size: number;

  @IsNumber()
  quantity: number;
}
