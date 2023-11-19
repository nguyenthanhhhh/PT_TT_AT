import { IsNumber, IsOptional } from 'class-validator';

export class CreateShoesRefSizeData {
  @IsNumber()
  size: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  shoesId: number;
}

export class UpdateShoesRefSizeData {
  @IsNumber()
  @IsOptional()
  size: number;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsNumber()
  @IsOptional()
  shoesId: number;
}
