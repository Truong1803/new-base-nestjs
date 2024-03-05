import { Module } from '@nestjs/common';

import { PostgresqlModule } from './database/postgresql.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { UsersModule } from './modules/users/users.module';
import { IoRedisModule } from './services/redis/redis.module';
import { AppController } from './app.controller';

@Module({
  imports: [IoRedisModule, UploadsModule, UsersModule, PostgresqlModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
