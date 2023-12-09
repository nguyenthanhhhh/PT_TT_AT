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

  async getListShoesCms(getCmsShoesData: GetCmsShoesData) {
    try {
      const filterQuery = { isDeleted: false };

      const take = Number(getCmsShoesData?.limit || LIMIT_DEFAULT);
      const skip = Number(getCmsShoesData?.offset || OFFSET_DEFAULT);

      if (getCmsShoesData?.categoryId) {
        filterQuery['category.id'] = getCmsShoesData?.categoryId;
      }

      const [shoes, total] = await this.shoesRepository.findAndCount({
        where: filterQuery,
        relations: {
          category: true,
          refSizes: true,
        },
        take,
        skip,
        order: {
          id: 'ASC',
        },
      });

      return { total, limit: take, offset: skip, data: shoes };
    } catch (error) {
      console.log('[getListShoes] err: ', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getShoesDetail(shoesId: number) {
    const shoes = await this.shoesRepository.findOne({
      where: {
        id: shoesId,
        isDeleted: false,
      },
      relations: {
        category: true,
        refSizes: true,
      },
    });

    if (!shoes)
      throw new HttpException('Shoes not found', HttpStatus.NOT_FOUND);

    return shoes;
  }

  async createShoesCms(createShoesData: CreateCmsShoesData) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: Number(createShoesData.categoryId), isDeleted: false },
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
          'image',
        ),
        category,
      });
      await this.shoesRepository.save(newShoes);

      return this.getShoesDetail(newShoes.id);
    } catch (error) {
      console.log('[createShoesCms] err: ', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateShoesCms(shoesId: number, updateShoesData: UpdateCmsShoesData) {
    const shoes = await this.getShoesDetail(shoesId);
    let category: Category;

    if (updateShoesData.categoryId) {
      category = await this.categoryRepository.findOne({
        where: {
          id: updateShoesData.categoryId,
          isDeleted: false,
        },
      });

      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
    }

    await this.shoesRepository.update(shoes.id, {
      ...pick(
        updateShoesData,
        'company',
        'image',
        'isBetterSell',
        'isNewArrival',
        'material',
        'name',
        'price',
        'vendor',
      ),
      category: category || shoes.category,
    });
    return this.getShoesDetail(shoes.id);
  }

  async deleteShoesCms(shoesId: number) {
    const shoes = await this.getShoesDetail(shoesId);

    await this.shoesRepository.update(shoes.id, { isDeleted: true });
    return true;
  }

  async getListShoes(getShoesData: GetCmsShoesData) {
    try {
      const filterQuery = { isDeleted: false };

      const take = Number(getShoesData?.limit || LIMIT_DEFAULT);
      const skip = Number(getShoesData?.offset || OFFSET_DEFAULT);

      if (getShoesData?.categoryId)
        filterQuery['category.id'] = getShoesData?.categoryId;

      const shoes = await this.shoesRepository.find({
        where: filterQuery,
        relations: {
          refSizes: true,
          category: true,
        },
        take,
        skip,
        order: {
          id: 'ASC',
        },
      });

      return { limit: take, offset: skip, data: shoes };
    } catch (error) {
      console.log('[getListShoes] error: ', error);
      throw new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
