import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from '../../../../common/dto/pagination.dto';
import { GetShoesData } from '../../../resource/shoes/dto/response.dto';

export class GetListShoesCmsData extends PaginationResponseDto {
  @ApiProperty({ type: [GetShoesData], required: true })
  data: GetShoesData[];
}
