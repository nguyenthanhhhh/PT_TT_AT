import { PaginationQueriesDto } from '../../../../common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetCmsCategoryData extends PaginationQueriesDto {
  @IsOptional()
  @IsString()
  search: string;
}

export class CreateCategoryData {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image: string;
}

export class UpdateCategoryData {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;
}
