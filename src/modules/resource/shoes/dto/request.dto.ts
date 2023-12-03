import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
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
  @IsString()
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
  @IsBoolean()
  @IsOptional()
  isBetterSell: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  isNewArrival: boolean;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  image: string;
}

export class UpdateCmsShoesData {
  @ApiProperty({
    type: String,
  })
  @IsOptional()
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

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  image: string;
}
