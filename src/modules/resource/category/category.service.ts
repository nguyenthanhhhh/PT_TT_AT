import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import {
  CreateCategoryData,
  GetCmsCategoryData,
  UpdateCategoryData,
} from './dto/request.dto';
import {
  LIMIT_DEFAULT,
  OFFSET_DEFAULT,
} from '../../../common/const/general.const';
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  async getListCategoryCms(getCmsCategoryData: GetCmsCategoryData) {
    const filterQuery = { isDeleted: false };

    const take = Number(getCmsCategoryData?.limit || LIMIT_DEFAULT);
    const skip = Number(getCmsCategoryData?.offset || OFFSET_DEFAULT);

    const [categories, total] = await this.categoryRepository.findAndCount({
      where: filterQuery,
      take,
      skip,
      order: {
        id: 'ASC',
      },
    });

    return { total, limit: take, offset: skip, data: categories };
  }

  async getCategoryDetail(categoryId: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
        isDeleted: false,
      },
      relations: {
        shoes: true,
      },
    });

    if (!category)
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);

    return category;
  }

  async createCategoryCms(createCategoryData: CreateCategoryData) {
    const newCategory = this.categoryRepository.create(createCategoryData);
    await this.categoryRepository.save(newCategory);

    this.clearCache().catch((error) => {
      console.log('[clearCacheCategory] error: ', error);
    });

    return this.getCategoryDetail(newCategory.id);
  }

  async updateCategoryCms(
    categoryId: number,
    updateCategoryData: UpdateCategoryData,
  ) {
    const category = await this.getCategoryDetail(categoryId);

    await this.categoryRepository.update(category.id, updateCategoryData);

    this.clearCache().catch((error) => {
      console.log('[clearCacheCategory] error: ', error);
    });

    return this.getCategoryDetail(category.id);
  }

  async deleteCategoryCms(categoryId: number) {
    const category = await this.getCategoryDetail(categoryId);

    await this.categoryRepository.update(category.id, { isDeleted: true });

    this.clearCache().catch((error) => {
      console.log('[clearCacheCategory] error: ', error);
    });

    return true;
  }

  async getListCategory() {
    try {
      const categories = await this.categoryRepository.find({
        where: { isDeleted: false },
        relations: {
          shoes: true,
        },
      });

      return categories;
    } catch (error) {
      console.log('[getListCategory] error: ', error);
      throw new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async clearCache() {
    return this.redisCacheService.scanAndDelete(`*/categories*`);
  }
}
