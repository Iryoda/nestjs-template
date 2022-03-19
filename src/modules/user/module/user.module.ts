import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { PrismaService } from 'src/shared/prisma/prisma.service';
import { HashProvider } from 'src/shared/providers/hashProvider/hashProvider.service';

import { CreateUserController } from '../controllers/create-user.controller';
import { FindUserController } from '../controllers/find-user.controller';
import { UpdateUserController } from '../controllers/update-user.controller';

import { UserRepository } from '../repositories/user-repository.repository';

import { JwtAuthGuard } from 'src/shared/guards/auth/jwt-auth.guard';
import { CreateUserService } from '../services/create-user.service';
import { UpdateUserService } from '../services/update-user.service';
import { FindUserService } from '../services/find-user.service';

import { IUserRepository } from '../repositories/IUserRepository';

@Module({
  imports: [],
  controllers: [CreateUserController, UpdateUserController, FindUserController],
  providers: [
    CreateUserService,
    UpdateUserService,
    FindUserService,
    PrismaService,
    HashProvider,
    { provide: IUserRepository, useClass: UserRepository },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [CreateUserService, UpdateUserService, FindUserService],
})
export class UserModule {}
