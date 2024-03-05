import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ENVIRONMENT, MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USERNAME } from 'src/constants';

import * as models from './entities';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        dialect: 'mysql',
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        username: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
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
export class MysqlModule {}
