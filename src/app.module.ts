import { Module } from '@nestjs/common';
import { loadConfig } from './config';
import { DatabaseModule } from './modules/resource/database/database.module';
import { CmsModule } from './modules/aggregators/cms/cms.module';
import { AuthModule } from './modules/aggregators/auth/auth.module';
import { ExploreModule } from './modules/aggregators/explore/explore.module';

@Module({
  imports: [loadConfig(), DatabaseModule, CmsModule, AuthModule, ExploreModule],
})
export class AppModule {}
