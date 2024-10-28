import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Description {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;
}

export class OrderInfo {
  @IsNumber()
  size: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  shoesId: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => Description)
  description: Description;
}

export class AddOrderData {
  @IsString()
  S: string;

  @IsString()
  PIMD: string;

  @ValidateNested()
  @Type(() => OrderInfo)
  OI: OrderInfo;
}

export class PaymentOrder {
  @IsNumber()
  id: number;

  // @IsString()
  // description: string;
}
