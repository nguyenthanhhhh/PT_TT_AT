import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../resource/user/user.module';
import { User } from '../../resource/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
