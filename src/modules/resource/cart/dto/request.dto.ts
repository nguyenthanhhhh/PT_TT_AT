import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class AddProductData {
  @IsNumber()
  shoesId: number;

  @IsNumber()
  size: number;

  @IsNumber()
  quantity: number;
}

export class PaidCartData {
  @IsArray()
  orderIds: any[];

  @IsOptional()
  description: any;
}
