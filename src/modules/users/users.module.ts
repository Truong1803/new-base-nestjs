import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/database/entities/users.model';

import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.services';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
