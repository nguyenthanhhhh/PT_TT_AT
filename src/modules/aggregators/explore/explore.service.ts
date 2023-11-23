import { Injectable } from '@nestjs/common';
import { UserService } from '../../resource/user/user.service';
import { RegisterAdminData } from '../../resource/user/dto/request.dto';
import { ShoesService } from '../../resource/shoes/shoes.service';
import { CategoryService } from '../../resource/category/category.service';

@Injectable()
export class ExploreService {
  constructor(
    private readonly userService: UserService,
    private readonly shoesService: ShoesService,
    private readonly categoryService: CategoryService,
  ) {}

  async registerUser(registerUserData: RegisterAdminData) {
    return this.userService.registerUser(registerUserData);
  }

  async getListShoes() {
    return this.shoesService.getListShoes();
  }

  async getShoesDetail(shoesId: number) {
    return this.shoesService.getShoesDetail(shoesId);
  }

  async getListCategory() {
    return this.categoryService.getListCategory();
  }

  async getCategoryDetail(categoryId: number) {
    return this.categoryService.getCategoryDetail(categoryId);
  }
}
