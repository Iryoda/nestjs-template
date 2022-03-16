import { Test, TestingModule } from '@nestjs/testing';
import { AlreadyExistError } from 'src/shared/errors/alreadyExist';

import { HashProvider } from 'src/shared/providers/hashProvider/hashProvider.service';

import { CreateUserDTO } from '../../../src/modules/user/dtos/createUserDTO';

import { InMemoryUserRepository } from '../../../src/modules/user/repositories/inMemory/InMemoryUserRepository';
import { IUserRepository } from '../../../src/modules/user/repositories/IUserRepository';
import { CreateUserService } from '../../../src/modules/user/services/createUserService.service';

describe('CreateUserService', () => {
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        HashProvider,
        {
          provide: IUserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    createUserService = module.get<CreateUserService>(CreateUserService);
  });

  it('Should create an user correcttly', async () => {
    const user = await createUserService.handle(CreateUserDTO.create());

    expect(user).toHaveProperty('id');
  });

  it('Should throw an error if email already exists', async () => {
    await createUserService.handle(CreateUserDTO.create());

    await expect(
      createUserService.handle(CreateUserDTO.create()),
    ).rejects.toBeInstanceOf(AlreadyExistError);
  });

  it('User password should be hashed', async () => {
    const createUser = CreateUserDTO.create();

    const user = await createUserService.handle({ ...createUser });

    expect(user.password).not.toBe(createUser.password);
  });
});
