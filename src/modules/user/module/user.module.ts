import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { HashProvider } from 'src/shared/providers/hashProvider/hashProvider.service';
import { CreateUserController } from '../controllers/createUser.controller';
import { FindUserController } from '../controllers/findUser.controller';
import { UpdateUserController } from '../controllers/updateUserUseCase.controller';
import { UserRepository } from '../repositories/userRepository';
import { CreateUserUseCase } from '../useCases/createUserUseCase.service';
import { FindUserUseCase } from '../useCases/findUserUseCase.service';
import { UpdateUserUseCase } from '../useCases/updateUserUseCase.service';

@Module({
  imports: [],
  controllers: [CreateUserController, UpdateUserController, FindUserController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    FindUserUseCase,
    UserRepository,
    PrismaService,
    HashProvider,
  ],
  exports: [
    CreateUserUseCase,
    UpdateUserUseCase,
    FindUserUseCase,
    UserRepository,
  ],
})
export class UserModule {}
