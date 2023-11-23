import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateShoesRefSizeData,
  UpdateShoesRefSizeData,
} from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoesRefSize } from './shoesRefSize.entity';
import { Repository } from 'typeorm';
import { pick } from 'lodash';
import { Shoes } from '../shoes/shoes.entity';

@Injectable()
export class ShoesRefSizeService {
  constructor(
    @InjectRepository(ShoesRefSize)
    private readonly shoesRefSizeRepository: Repository<ShoesRefSize>,
    @InjectRepository(Shoes)
    private readonly shoesRepository: Repository<Shoes>,
  ) {}

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
      where: { id: createShoesRefSizeData.shoesId },
    });

    if (!shoes)
      throw new HttpException('Shoes not found', HttpStatus.NOT_FOUND);

    const checkExist = await this.shoesRefSizeRepository.findOne({
      where: {
        shoes: { id: shoes.id },
        size: createShoesRefSizeData.size,
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
