import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shoes } from './shoes.entity';
import { pick } from 'lodash';
import {
  CreateCmsShoesData,
  GetCmsShoesData,
  UpdateCmsShoesData,
} from './dto/request.dto';
import {
  LIMIT_DEFAULT,
  OFFSET_DEFAULT,
} from '../../../common/const/general.const';
import { Category } from '../category/category.entity';

@Injectable()
export class ShoesService {
  constructor(
    @InjectRepository(Shoes)
    private readonly shoesRepository: Repository<Shoes>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getListShoesForCms(getCmsShoesData: GetCmsShoesData) {
    try {
      const filterQuery = { isDeleted: false };

      const take = Number(getCmsShoesData?.limit || LIMIT_DEFAULT);
      const skip = Number(getCmsShoesData?.offset || OFFSET_DEFAULT);

      if (getCmsShoesData?.categoryId)
        filterQuery['categoryId'] = getCmsShoesData?.categoryId;

      const [shoes, total] = await this.shoesRepository.findAndCount({
        where: filterQuery,
        relations: {
          category: true,
          refSizes: true,
        },
        take,
        skip,
      });

      return { total, limit: take, offset: skip, data: shoes };
    } catch (error) {
      console.log('[getListShoesForCms] err: ', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getShoesDetailForCms(shoesId: number) {
    const shoes = await this.shoesRepository.findOne({
      where: {
        id: shoesId,
        isDeleted: false,
      },
    });

    if (!shoes)
      throw new HttpException('Shoes not found', HttpStatus.NOT_FOUND);

    return shoes;
  }

  async createShoesCms(createShoesData: CreateCmsShoesData) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: createShoesData.categoryId },
      });
      const newShoes = this.shoesRepository.create({
        ...pick(
          createShoesData,
          'company',
          'isBetterSell',
          'isNewArrival',
          'material',
          'name',
          'price',
          'vendor',
        ),
        category,
      });
      await this.shoesRepository.save(newShoes);

      return this.getShoesDetailForCms(newShoes.id);
    } catch (error) {
      console.log('[createShoesCms] err: ', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateShoesCms(shoesId: number, updateShoesData: UpdateCmsShoesData) {
    const shoes = await this.getShoesDetailForCms(shoesId);

    await this.shoesRepository.update(shoes.id, updateShoesData);
    return this.getShoesDetailForCms(shoes.id);
  }

  async deleteShoesCms(shoesId: number) {
    const shoes = await this.getShoesDetailForCms(shoesId);

    await this.shoesRepository.update(shoes.id, { isDeleted: true });
    return true;
  }
}
