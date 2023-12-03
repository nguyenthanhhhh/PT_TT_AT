import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateShoesRefSizeData,
  GetRefSizeData,
  UpdateShoesRefSizeData,
} from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoesRefSize } from './shoesRefSize.entity';
import { Repository } from 'typeorm';
import { pick } from 'lodash';
import { Shoes } from '../shoes/shoes.entity';
import {
  LIMIT_DEFAULT,
  OFFSET_DEFAULT,
} from '../../../common/const/general.const';

@Injectable()
export class ShoesRefSizeService {
  constructor(
    @InjectRepository(ShoesRefSize)
    private readonly shoesRefSizeRepository: Repository<ShoesRefSize>,
    @InjectRepository(Shoes)
    private readonly shoesRepository: Repository<Shoes>,
  ) {}

  async getListShoesRefSize(getRefSizeData: GetRefSizeData) {
    const take = Number(getRefSizeData?.limit || LIMIT_DEFAULT);
    const skip = Number(getRefSizeData?.offset || OFFSET_DEFAULT);

    const { search } = getRefSizeData;

    const query = this.shoesRefSizeRepository
      .createQueryBuilder('rs')
      .innerJoinAndSelect('rs.shoes', 'shoes')
      .where('rs.isDeleted = :isDeleted', { isDeleted: false });

    if (search) {
      query.andWhere('shoes.name ILIKE :search', { search: `%${search}%` });
    }

    query.orderBy('rs.id', 'ASC');
    query.skip(skip).take(take);

    const [data, total] = await query.getManyAndCount();

    return { total, limit: take, offset: skip, data };
  }

  async getShoesRefSizeDetail(shoesRefSizeId: number) {
    const shoesRefSize = await this.shoesRefSizeRepository.findOne({
      where: {
        id: shoesRefSizeId,
        isDeleted: false,
      },
    });

    if (!shoesRefSize)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return shoesRefSize;
  }

  async createShoesRefSizeCms(createShoesRefSizeData: CreateShoesRefSizeData) {
    const shoes = await this.shoesRepository.findOne({
      where: { id: createShoesRefSizeData.shoesId, isDeleted: false },
    });

    if (!shoes)
      throw new HttpException('Shoes not found', HttpStatus.NOT_FOUND);

    const checkExist = await this.shoesRefSizeRepository.findOne({
      where: {
        shoes: { id: shoes.id },
        size: createShoesRefSizeData.size,
        isDeleted: false,
      },
    });

    if (checkExist)
      throw new HttpException(
        `Size already exist on ${shoes.name}`,
        HttpStatus.CONFLICT,
      );

    const shoesRefSize = this.shoesRefSizeRepository.create({
      ...pick(createShoesRefSizeData, 'quantity', 'size'),
      shoes,
    });

    await this.shoesRefSizeRepository.save(shoesRefSize);
    return this.getShoesRefSizeDetail(shoesRefSize.id);
  }

  async updateShoesRefSizeCms(
    shoesRefSizeId: number,
    updateShoesRefSizeData: UpdateShoesRefSizeData,
  ) {
    const shoesRefSize = await this.getShoesRefSizeDetail(shoesRefSizeId);

    await this.shoesRefSizeRepository.update(
      shoesRefSize.id,
      updateShoesRefSizeData,
    );

    return this.getShoesRefSizeDetail(shoesRefSize.id);
  }

  async deleteShoesRefSizeCms(shoesRefSizeId: number) {
    const shoesRefSize = await this.getShoesRefSizeDetail(shoesRefSizeId);

    await this.shoesRefSizeRepository.update(shoesRefSize.id, {
      isDeleted: true,
    });
    return true;
  }
}
