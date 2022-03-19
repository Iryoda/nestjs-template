import { Test, TestingModule } from '@nestjs/testing';

import { IUserRepository } from 'src/modules/user/repositories/IUserRepository';
import { CreateUserDTO } from 'src/modules/user/dtos/create-user.dto';
import { InMemoryUserRepository } from 'src/modules/user/repositories/inMemory/InMemoryUserRepository';

import { HashProvider } from 'src/shared/providers/hashProvider/hashProvider.service';
import { CreateUserService } from 'src/modules/user/services/create-user.service';

import { AlreadyExistError } from 'src/shared/errors/already-exist';
import { MailServiceMock } from 'src/shared/providers/mailerProvider/Mocks/mail-service-mock';
import { MailerService } from '@nestjs-modules/mailer';

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let mailService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        HashProvider,
        { provide: MailerService, useClass: MailServiceMock },
        {
          provide: IUserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    createUserService = module.get<CreateUserService>(CreateUserService);
    mailService = module.get<MailerService>(MailerService);
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

  it('User password should be hashed', async () => {
    const createUser = CreateUserDTO.create();

    const user = await createUserService.handle({ ...createUser });

    expect(user.password).not.toBe(createUser.password);
  });

  it('MailService should be called once', async () => {
    const sut = jest.spyOn(mailService, 'sendMail');

    const createUser = CreateUserDTO.create();

    await createUserService.handle({ ...createUser });

    expect(sut).toHaveBeenCalled();
  });
});
