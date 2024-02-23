import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
        migrationsTableName: 'migration',
        entities: [join(__dirname, '../modules/**/*.entity{.js,.ts}')],
        migrations: [join(__dirname, '../migrations/**/*{.js,.ts}')],
        cli: {
          migrationsDir: 'src/migrations',
        },
        migrationsRun: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
