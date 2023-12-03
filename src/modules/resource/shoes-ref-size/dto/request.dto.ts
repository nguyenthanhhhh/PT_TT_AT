import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQueriesDto } from '../../../../common/dto/pagination.dto';

export class GetRefSizeData extends PaginationQueriesDto {
  @IsString()
  @IsOptional()
  search: string;
}
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
