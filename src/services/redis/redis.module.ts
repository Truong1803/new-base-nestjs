import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { PREFIX_KEY, REDIS_DB, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from 'src/constants';

import { RedisService } from './redis.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => {
        return {
          config: {
            host: REDIS_HOST,
            port: REDIS_PORT,
            password: REDIS_PASSWORD,
            db: REDIS_DB,
            keyPrefix: PREFIX_KEY,
          },
        };
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class IoRedisModule {}
