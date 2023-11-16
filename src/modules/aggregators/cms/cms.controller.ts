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
} from '../../resource/shoes/dto/request.dto';
import { GetListShoesCmsData } from './dto/response.dto';
import { PaginationQueriesDto } from '../../../common/dto/pagination.dto';
import { GetShoesData } from '../../resource/shoes/dto/response.dto';

@ApiTags('Cms')
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

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
    type: GetShoesData,
    description: 'Create success',
  })
  @ApiBody({
    type: CreateCmsShoesData,
    description: 'Create Shoes cms',
  })
  async createShoesCms(@Body() body) {
    return this.cmsService.createShoes(body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Patch('shoes/:id')
  @ApiBearerAuth()
  async updateShoesCms(@Param() param, @Body() body) {
    return this.cmsService.updateShoes(param.id, body);
  }

  @UseGuards(AuthGuard, AuthorAdminGuard)
  @Delete('shoes/:id')
  @ApiBearerAuth()
  async deleteShoesCms(@Param() param) {
    return this.cmsService.deleteShoes(param.id);
  }
}
