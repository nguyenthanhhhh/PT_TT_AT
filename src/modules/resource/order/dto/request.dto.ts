import { IsNumber, IsOptional } from 'class-validator';

export class AddOrderData {
  @IsNumber()
  size: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  shoesId: number;

  @IsOptional()
  description: any;
}
