import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CmsService } from './cms.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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
import { GetListShoesCmsData } from './dto/response.dto';
import { PaginationQueriesDto } from '../../../common/dto/pagination.dto';
import { GetShoesData } from '../../resource/shoes/dto/response.dto';
import {
  CreateCategoryData,
  GetCmsCategoryData,
  UpdateCategoryData,
} from '../../resource/category/dto/request.dto';
import {
  CreateShoesRefSizeData,
  UpdateShoesRefSizeData,
} from '../../resource/shoes-ref-size/dto/request.dto';

@ApiTags('Cms')
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('users')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get list User for CMS',
  })
  @ApiQuery({
    type: PaginationQueriesDto,
  })
  async getListUserForCms() {
    return this.cmsService.getListUserCms();
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('users/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get User detail for CMS',
  })
  @ApiParam({ name: 'id', description: 'User id', required: true })
  async getUserDetailForCms(@Param() params) {
    return this.cmsService.getUserDetailCms(Number(params.id));
  }

  @Post('registers')
  @ApiCreatedResponse({
    description: 'Register admin user',
    type: RegisterAdminData,
  })
  @ApiBody({
    type: RegisterAdminData,
  })
  async registerAdminUser(@Body() registerData: RegisterAdminData) {
    return this.cmsService.registerAdminUsers(registerData);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Patch('change-password/admin')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Change admin password success',
  })
  @ApiBody({
    type: ChangePasswordData,
  })
  async changePasswordAdmin(
    @Request() req,
    changePassData: ChangePasswordData,
  ) {
    return this.cmsService.changePasswordAdmin(req.user?.id, changePassData);
  }

  @UseGuards(AuthGuard)
  @Patch('change-password/user')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Change user password success',
  })
  @ApiBody({
    type: ChangePasswordData,
  })
  async changePasswordUser(@Request() req, changePassData: ChangePasswordData) {
    return this.cmsService.changePasswordUser(req.user?.id, changePassData);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('shoes')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: GetListShoesCmsData,
    description: 'Get list Shoes for CMS',
  })
  @ApiQuery({
    type: PaginationQueriesDto,
  })
  async getListShoesForCms(getCmsShoesData: GetCmsShoesData) {
    return this.cmsService.getListShoes(getCmsShoesData);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('shoes/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: GetShoesData,
    description: 'Get Shoes detail for CMS',
  })
  @ApiParam({ name: 'id', description: 'Shoes id', required: true })
  async getShoesDetailForCms(@Param() params) {
    return this.cmsService.getShoesDetail(params.id);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Post('shoes')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Create success',
  })
  @ApiBody({
    type: CreateCmsShoesData,
    description: 'Create Shoes cms',
  })
  async createShoesCms(@Body() body: CreateCmsShoesData) {
    console.log(body);
    return this.cmsService.createShoes(body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Patch('shoes/:id')
  @ApiBearerAuth()
  async updateShoesCms(@Param() param, @Body() body: UpdateCmsShoesData) {
    return this.cmsService.updateShoes(param.id, body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Delete('shoes/:id')
  @ApiBearerAuth()
  async deleteShoesCms(@Param() param) {
    return this.cmsService.deleteShoes(param.id);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Post('shoesRefSize')
  @ApiBearerAuth()
  async createShoesRefSizeCms(@Body() body: CreateShoesRefSizeData) {
    return this.cmsService.createShoesRefSize(body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Patch('shoesRefSize/:id')
  @ApiBearerAuth()
  async updateShoesRefSizeCms(
    @Param() param,
    @Body() body: UpdateShoesRefSizeData,
  ) {
    return this.cmsService.updateShoesRefSize(param.id, body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Delete('shoesRefSize/:id')
  @ApiBearerAuth()
  async deleteShoesRefSizeCms(@Param() param) {
    return this.cmsService.deleteShoesRefSize(param.id);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('categories')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: GetListShoesCmsData,
    description: 'Get list Category for CMS',
  })
  @ApiQuery({
    type: PaginationQueriesDto,
  })
  async getListCategoryForCms(getCmsCategoryData: GetCmsCategoryData) {
    return this.cmsService.getListCategory(getCmsCategoryData);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Get('categories/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: GetShoesData,
    description: 'Get Category detail for CMS',
  })
  @ApiParam({ name: 'id', description: 'Category id', required: true })
  async getCategoryDetailForCms(@Param() params) {
    return this.cmsService.getCategoryDetail(params.id);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Post('categories')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Create Category for CMS',
  })
  async createCategoryForCms(@Body() body: CreateCategoryData) {
    return this.cmsService.createCategory(body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Patch('categories/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Update Category for CMS',
  })
  async updateCategoryForCms(@Param() param, @Body() body: UpdateCategoryData) {
    return this.cmsService.updateCategory(Number(param.id), body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Delete('categories/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete Category for CMS',
  })
  async deleteCategoryForCms(@Param() param) {
    return this.cmsService.deleteCategory(Number(param.id));
  }
}
