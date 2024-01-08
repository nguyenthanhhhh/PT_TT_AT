import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationQueriesDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}

export class PaginationResponseDto {
  @IsNumber()
  @Min(0)
  total: number;

  @IsNumber()
  @Min(0)
  offset: number;

  @IsNumber()
  @Min(1)
  limit: number;
}
