import { Injectable } from '@nestjs/common';
import { UserService } from '../../resource/user/user.service';
import {
  ChangePasswordData,
  RegisterAdminData,
} from '../../resource/user/dto/request.dto';

@Injectable()
export class CmsService {
  constructor(private readonly userService: UserService) {}

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

  getHello() {
    return 'Hello';
  }
}
