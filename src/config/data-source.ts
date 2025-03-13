import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

if (!process.env.DATABASE_URL) {
  config();
}

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
  synchronize: !isProduction,
  migrationsRun: isProduction,
  logging: !isProduction,
});
