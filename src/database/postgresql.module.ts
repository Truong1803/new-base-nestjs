import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  ENVIRONMENT,
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
} from 'src/constants';

import * as models from './entities';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        dialect: 'postgres',
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
        username: POSTGRES_USERNAME,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DATABASE,
        autoLoadModels: false,
        models: Object.values(models),
        logging: false,
        query: {
          raw: true,
        },
        dialectOptions:
          ENVIRONMENT != 'local'
            ? {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            }
            : {},
      }),
    }),
  ],
})
export class PostgresqlModule {}
