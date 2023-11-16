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

@Injectable()
export class CmsService {
  constructor(
    private readonly userService: UserService,
    private readonly shoesService: ShoesService,
  ) {}

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
    return this.shoesService.getListShoesForCms(getCmsShoesData);
  }

  async getShoesDetail(shoesId: number) {
    return this.shoesService.getShoesDetailForCms(shoesId);
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

  getHello() {
    return 'Hello';
  }
}
