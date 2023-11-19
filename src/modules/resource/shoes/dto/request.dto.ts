import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQueriesDto } from '../../../../common/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetCmsShoesData extends PaginationQueriesDto {
  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  categoryId: number;
}

export class CreateCmsShoesData {
  @ApiProperty({
    type: String,
  })
  @IsNumber()
  name: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  material: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  vendor: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  company: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsString()
  isBetterSell: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @IsString()
  isNewArrival: boolean;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  categoryId: number;
}

export class UpdateCmsShoesData {
  @ApiProperty({
    type: String,
  })
  @IsNumber()
  name: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  material: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  vendor: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  company: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsString()
  @IsOptional()
  isBetterSell: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @IsString()
  @IsOptional()
  isNewArrival: boolean;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  categoryId: number;
}
