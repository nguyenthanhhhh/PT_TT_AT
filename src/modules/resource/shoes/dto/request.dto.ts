import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQueriesDto } from '../../../../common/dto/pagination.dto';

export class GetCmsShoesData extends PaginationQueriesDto {
  @IsOptional()
  categoryId: number;
}

export class CreateCmsShoesData {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  material: string;

  @IsString()
  @IsOptional()
  vendor: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsBoolean()
  @IsOptional()
  isBetterSell: boolean;

  @IsBoolean()
  @IsOptional()
  isNewArrival: boolean;

  @IsNumber()
  categoryId: number;

  @IsString()
  @IsOptional()
  image: string;
}

export class UpdateCmsShoesData {
  @IsOptional()
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  material: string;

  @IsString()
  @IsOptional()
  vendor: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsBoolean()
  @IsOptional()
  isBetterSell: boolean;

  @IsBoolean()
  @IsOptional()
  isNewArrival: boolean;

  @IsNumber()
  @IsOptional()
  categoryId: number;

  @IsOptional()
  @IsString()
  image: string;
}
