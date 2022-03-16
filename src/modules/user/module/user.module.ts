import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { PrismaService } from 'src/shared/prisma/prisma.service';
import { HashProvider } from 'src/shared/providers/hashProvider/hashProvider.service';

import { CreateUserController } from '../controllers/createUser.controller';
import { FindUserController } from '../controllers/findUser.controller';
import { UpdateUserController } from '../controllers/updateUser.controller';

import { UserRepository } from '../repositories/userRepository';

import { JwtAuthGuard } from 'src/shared/guards/auth/jwt-auth.guard';
import { CreateUserService } from '../services/createUserService.service';
import { UpdateUserService } from '../services/updateUserService.service';
import { FindUserService } from '../services/findUserUseService.service';

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
