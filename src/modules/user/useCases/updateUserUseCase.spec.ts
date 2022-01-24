import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '../dtos/createUserDTO';
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUserRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/userRepository';
import { UpdateUserUseCase } from './updateUserUseCase.service';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let inMemoryUserRepository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        { provide: UserRepository, useClass: InMemoryUserRepository },
      ],
    }).compile();

    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    inMemoryUserRepository = module.get<UserRepository>(UserRepository);
  });

  it('Should update user correctly', async () => {
    const user = await inMemoryUserRepository.create(CreateUserDTO.create());

    const newUsername = 'updated_username';

    const response = await updateUserUseCase.handle(user.id, {
      username: newUsername,
    });

    expect(response.username).toEqual(newUsername);
  });
});
