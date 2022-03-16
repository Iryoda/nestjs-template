import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from 'src/modules/user/dtos/createUserDTO';
import { InMemoryUserRepository } from 'src/modules/user/repositories/inMemory/InMemoryUserRepository';
import { IUserRepository } from 'src/modules/user/repositories/IUserRepository';
import { FindUserService } from 'src/modules/user/services/findUserUseService.service';

import { PrismaService } from 'src/shared/prisma/prisma.service';

describe('FindUserService', () => {
  let findUserService: FindUserService;
  let inMemoryUserRepository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        FindUserService,
        { provide: IUserRepository, useClass: InMemoryUserRepository },
      ],
    }).compile();

    findUserService = module.get<FindUserService>(FindUserService);
    inMemoryUserRepository = module.get<IUserRepository>(IUserRepository);
  });

  it('Should find an user correctly', async () => {
    const user = await inMemoryUserRepository.create(CreateUserDTO.create());

    await expect(findUserService.byId(user.id)).resolves.toBe(user);
  });
});
