import { Module } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CmsController } from './cms.controller';
import { UserModule } from '../../resource/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UserModule, JwtModule, AuthModule],
  controllers: [CmsController],
  providers: [CmsService],
})
export class CmsModule {}
