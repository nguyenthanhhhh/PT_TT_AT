import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CmsService } from './cms.service';
import {
  ChangePasswordData,
  RegisterAdminData,
} from '../../resource/user/dto/request.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthorAdminGuard } from '../auth/author-admin.guard';
import {
  CreateCmsShoesData,
  GetCmsShoesData,
  UpdateCmsShoesData,
} from '../../resource/shoes/dto/request.dto';
import {
  CreateCategoryData,
  GetCmsCategoryData,
  UpdateCategoryData,
} from '../../resource/category/dto/request.dto';
import {
  CreateShoesRefSizeData,
  GetRefSizeData,
  UpdateShoesRefSizeData,
} from '../../resource/shoes-ref-size/dto/request.dto';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('users')
  async getListUserForCms() {
    return this.cmsService.getListUserCms();
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('users/:id')
  async getUserDetailForCms(@Param() params) {
    return this.cmsService.getUserDetailCms(Number(params.id));
  }

  @Post('registers')
  async registerAdminUser(@Body() registerData: RegisterAdminData) {
    return this.cmsService.registerAdminUsers(registerData);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Patch('change-password/admin')
  async changePasswordAdmin(
    @Request() req,
    changePassData: ChangePasswordData,
  ) {
    return this.cmsService.changePasswordAdmin(req.user?.id, changePassData);
  }

  @UseGuards(AuthGuard)
  @Patch('change-password/user')
  async changePasswordUser(@Request() req, changePassData: ChangePasswordData) {
    return this.cmsService.changePasswordUser(req.user?.id, changePassData);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('shoes')
  async getListShoesForCms(@Query() getCmsShoesData: GetCmsShoesData) {
    return this.cmsService.getListShoes(getCmsShoesData);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('shoes/:id')
  async getShoesDetailForCms(@Param() params) {
    return this.cmsService.getShoesDetail(params.id);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Post('shoes')
  async createShoesCms(@Body() body: CreateCmsShoesData) {
    return this.cmsService.createShoes(body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Patch('shoes/:id')
  async updateShoesCms(@Param() param, @Body() body: UpdateCmsShoesData) {
    return this.cmsService.updateShoes(param.id, body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Delete('shoes/:id')
  async deleteShoesCms(@Param() param) {
    return this.cmsService.deleteShoes(param.id);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('shoesRefSize')
  async getListRefSize(@Query() getRefSizeData: GetRefSizeData) {
    return this.cmsService.getListRefSize(getRefSizeData);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('shoesRefSize/:id')
  async getShoesRefSizeDetailCms(@Param() param) {
    return this.cmsService.getRefSizeDetail(Number(param.id));
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Post('shoesRefSize')
  async createShoesRefSizeCms(@Body() body: CreateShoesRefSizeData) {
    return this.cmsService.createShoesRefSize(body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Patch('shoesRefSize/:id')
  async updateShoesRefSizeCms(
    @Param() param,
    @Body() body: UpdateShoesRefSizeData,
  ) {
    return this.cmsService.updateShoesRefSize(param.id, body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Delete('shoesRefSize/:id')
  async deleteShoesRefSizeCms(@Param() param) {
    return this.cmsService.deleteShoesRefSize(param.id);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('categories')
  async getListCategoryForCms(@Query() getCmsCategoryData: GetCmsCategoryData) {
    const result = await this.cmsService.getListCategory(getCmsCategoryData);

    return result;
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('categories/:id')
  async getCategoryDetailForCms(@Param() params) {
    return this.cmsService.getCategoryDetail(params.id);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Post('categories')
  async createCategoryForCms(@Body() body: CreateCategoryData) {
    return this.cmsService.createCategory(body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Patch('categories/:id')
  async updateCategoryForCms(@Param() param, @Body() body: UpdateCategoryData) {
    return this.cmsService.updateCategory(Number(param.id), body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Delete('categories/:id')
  async deleteCategoryForCms(@Param() param) {
    return this.cmsService.deleteCategory(Number(param.id));
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('orders')
  async getOrder() {
    return this.cmsService.getOrder();
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('orders/:id')
  async getOrderDetail(@Param() param) {
    return this.cmsService.getOrderDetail(param.id);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Patch('orders/verify/:id')
  async verifyOrder(@Param() param) {
    return this.cmsService.verifyOrder(param.id);
  }
}
