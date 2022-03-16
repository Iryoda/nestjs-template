import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from 'src/modules/user/dtos/createUserDTO';
import { InMemoryUserRepository } from 'src/modules/user/repositories/inMemory/InMemoryUserRepository';
import { IUserRepository } from 'src/modules/user/repositories/IUserRepository';
import { UpdateUserService } from 'src/modules/user/services/updateUserService.service';

describe('UpdateUserService', () => {
  let updateUserService: UpdateUserService;
  let inMemoryUserRepository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        { provide: IUserRepository, useClass: InMemoryUserRepository },
      ],
    }).compile();

    updateUserService = module.get<UpdateUserService>(UpdateUserService);
    inMemoryUserRepository = module.get<IUserRepository>(IUserRepository);
  });

  it('Should update user correctly', async () => {
    const user = await inMemoryUserRepository.create(CreateUserDTO.create());

    const newUsername = 'updated_username';

    const response = await updateUserService.handle(user.id, {
      username: newUsername,
    });

    expect(response.username).toEqual(newUsername);
  });
});
