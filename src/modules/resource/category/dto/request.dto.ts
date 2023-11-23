import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueriesDto } from '../../../../common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetCmsCategoryData extends PaginationQueriesDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  search: string;
}

export class CreateCategoryData {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  image: string;
}

export class UpdateCategoryData {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  image: string;
}
