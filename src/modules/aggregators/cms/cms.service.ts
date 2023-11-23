import { Injectable } from '@nestjs/common';
import { UserService } from '../../resource/user/user.service';
import {
  ChangePasswordData,
  RegisterAdminData,
} from '../../resource/user/dto/request.dto';
import {
  CreateCmsShoesData,
  GetCmsShoesData,
  UpdateCmsShoesData,
} from '../../resource/shoes/dto/request.dto';
import { ShoesService } from '../../resource/shoes/shoes.service';
import {
  CreateShoesRefSizeData,
  UpdateShoesRefSizeData,
} from '../../resource/shoes-ref-size/dto/request.dto';
import { ShoesRefSizeService } from '../../resource/shoes-ref-size/shoesRefSize.service';
import {
  CreateCategoryData,
  GetCmsCategoryData,
  UpdateCategoryData,
} from '../../resource/category/dto/request.dto';
import { CategoryService } from '../../resource/category/category.service';

@Injectable()
export class CmsService {
  constructor(
    private readonly userService: UserService,
    private readonly shoesService: ShoesService,
    private readonly shoesRefSizeService: ShoesRefSizeService,
    private readonly categoryService: CategoryService,
  ) {}

  async getListUserCms() {
    return this.userService.getListUserCms();
  }

  async getUserDetailCms(userId: number) {
    return this.userService.getUserDetailCms(userId);
  }

  async registerAdminUsers(createAdminData: RegisterAdminData) {
    return this.userService.registerAdminUser(createAdminData);
  }

  async changePasswordAdmin(
    adminId: number,
    changePassData: ChangePasswordData,
  ) {
    return this.userService.changePasswordAdmin(adminId, changePassData);
  }

  async changePasswordUser(userId: number, changePassData: ChangePasswordData) {
    return this.userService.changePasswordUser(userId, changePassData);
  }

  async getListShoes(getCmsShoesData: GetCmsShoesData) {
    return this.shoesService.getListShoesCms(getCmsShoesData);
  }

  async getShoesDetail(shoesId: number) {
    return this.shoesService.getShoesDetail(shoesId);
  }

  async createShoes(createShoesData: CreateCmsShoesData) {
    return this.shoesService.createShoesCms(createShoesData);
  }

  async updateShoes(shoesId: number, updateShoesData: UpdateCmsShoesData) {
    return this.shoesService.updateShoesCms(shoesId, updateShoesData);
  }

  async deleteShoes(shoesId: number) {
    return this.shoesService.deleteShoesCms(shoesId);
  }

  async createShoesRefSize(createShoesRefSizeData: CreateShoesRefSizeData) {
    return this.shoesRefSizeService.createShoesRefSizeCms(
      createShoesRefSizeData,
    );
  }

  async updateShoesRefSize(
    shoesRefSizeId: number,
    updateShoesRefSizeData: UpdateShoesRefSizeData,
  ) {
    return this.shoesRefSizeService.updateShoesRefSizeCms(
      shoesRefSizeId,
      updateShoesRefSizeData,
    );
  }

  async deleteShoesRefSize(shoesRefSizeId: number) {
    return this.shoesRefSizeService.deleteShoesRefSizeCms(shoesRefSizeId);
  }

  async getListCategory(getCmsCategoryData: GetCmsCategoryData) {
    return this.categoryService.getListCategoryCms(getCmsCategoryData);
  }

  async getCategoryDetail(categoryId: number) {
    return this.categoryService.getCategoryDetail(categoryId);
  }

  async createCategory(createCategoryData: CreateCategoryData) {
    return this.categoryService.createCategoryCms(createCategoryData);
  }

  async updateCategory(
    categoryId: number,
    updateCategoryData: UpdateCategoryData,
  ) {
    return this.categoryService.updateCategoryCms(
      categoryId,
      updateCategoryData,
    );
  }

  async deleteCategory(categoryId: number) {
    return this.categoryService.deleteCategoryCms(categoryId);
  }
}
