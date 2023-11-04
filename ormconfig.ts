import { DataSource } from 'typeorm';
import 'dotenv/config';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: parseInt(configService.get('POSTGRES_PORT') || '5432'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migration',
  migrations: ['src/migrations/*{.ts,.js}'],
});

export default AppDataSource;
