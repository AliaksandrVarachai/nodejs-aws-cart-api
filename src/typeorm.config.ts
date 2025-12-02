import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

const isDevelopment = process.env.NODE_ENV === 'development';

config({
  path: isDevelopment ? '.env.development' : '.env.production',
});

export const dataSourceConfig: DataSourceOptions = {
  // basic setup
  synchronize: isDevelopment,
  migrations: ['dist/migrations/**/*.js'],

  // optional
  migrationsRun: isDevelopment,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',

  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity.{js,ts}'],
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    ssl: {
      rejectUnauthorized: false,
    },
  }
}

console.log(`Started with NODE_ENV=${process.env.NODE_ENV} DB_NAME=${process.env.DB_NAME}`);

export default new DataSource(dataSourceConfig);
