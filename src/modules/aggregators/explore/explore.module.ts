import { Module } from '@nestjs/common';
import { UserModule } from '../../resource/user/user.module';
import { ExploreController } from './explore.controller';
import { ExploreService } from './explore.service';
import { ShoesModule } from '../../resource/shoes/shoes.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../../resource/category/category.module';

@Module({
  imports: [UserModule, ShoesModule, AuthModule, CategoryModule],
  controllers: [ExploreController],
  providers: [ExploreService],
})
export class ExploreModule {}
