import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateUserDTO } from '../dtos/createUserDTO';
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUserRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/userRepository';
import { FindUserUseCase } from './findUserUseCase.service';

describe('FindUserUseCase', () => {
  let findUserUseCase: FindUserUseCase;
  let inMemoryUserRepository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        FindUserUseCase,
        { provide: UserRepository, useClass: InMemoryUserRepository },
      ],
    }).compile();

    findUserUseCase = module.get<FindUserUseCase>(FindUserUseCase);
    inMemoryUserRepository = module.get<UserRepository>(UserRepository);
  });

  it('Should find an user correctly', async () => {
    const user = await inMemoryUserRepository.create(CreateUserDTO.create());

    await expect(findUserUseCase.byId(user.id)).resolves.toBe(user);
  });
});
