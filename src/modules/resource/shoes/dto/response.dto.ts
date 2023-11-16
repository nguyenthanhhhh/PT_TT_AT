import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetShoesData {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  price: number;

  @ApiProperty({ type: String, required: true })
  @IsNumber()
  material: string;

  @ApiProperty({ type: String, required: true })
  @IsNumber()
  vendor: string;

  @ApiProperty({ type: String, required: true })
  @IsNumber()
  company: string;

  @ApiProperty({ type: Boolean, required: true })
  @IsNumber()
  isBetterSell: boolean;

  @ApiProperty({ type: Boolean, required: true })
  @IsNumber()
  isNewArrival: boolean;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  categoryId: number;
}
