import { Test, TestingModule } from '@nestjs/testing';
import { AlreadyExistError } from 'src/shared/errors/alreadyExist';
import { HashProvider } from 'src/shared/providers/hashProvider/hashProvider.service';
import { CreateUserDTO } from '../dtos/createUserDTO';
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUserRepository';
import { UserRepository } from '../repositories/userRepository';
import { CreateUserUseCase } from './createUserUseCase.service';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        HashProvider,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('Should create an user correcttly', async () => {
    const user = await createUserUseCase.handle(CreateUserDTO.create());

    expect(user).toHaveProperty('id');
  });

  it('Should throw an error if email already exists', async () => {
    await createUserUseCase.handle(CreateUserDTO.create());

    await expect(
      createUserUseCase.handle(CreateUserDTO.create()),
    ).rejects.toBeInstanceOf(AlreadyExistError);
  });

  it('User password should be hashed', async () => {
    const createUser = CreateUserDTO.create();

    const user = await createUserUseCase.handle({ ...createUser });

    expect(user.password).not.toBe(createUser.password);
  });
});
