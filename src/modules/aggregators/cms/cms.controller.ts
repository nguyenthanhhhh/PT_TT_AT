import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CmsService } from './cms.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ChangePasswordData,
  RegisterAdminData,
} from '../../resource/user/dto/request.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthorAdminGuard } from '../auth/author-admin.guard';

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

  @Patch('change-password/admin')
  @UseGuards(AuthGuard, AuthorAdminGuard)
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

  @Patch('change-password/user')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Change user password success',
  })
  @ApiBody({
    type: ChangePasswordData,
  })
  async changePasswordUser(@Request() req, changePassData: ChangePasswordData) {
    return this.cmsService.changePasswordUser(req.user?.id, changePassData);
  }
}
