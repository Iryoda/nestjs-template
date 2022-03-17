import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AlreadyExistError } from 'src/shared/errors/alreadyExist';
import { HashProvider } from 'src/shared/providers/hashProvider/hashProvider.service';

import { User } from '../domain/User';
import { CreateUserDTO } from '../dtos/createUserDTO';

import { IUserRepository } from '../repositories/IUserRepository';

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: HashProvider,
    private mailService: MailerService,
  ) {}

  private async sendMail(user: User) {
    await this.mailService.sendMail({
      to: user.email,
      subject: 'Seja, Bem Vindo!',
      template: 'create_user',
      context: {
        username: user.username,
      },
    });
  }

  async handle(data: CreateUserDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (user) throw new AlreadyExistError('Email');

    const hashedPassword = await this.hashProvider.hash(data.password);

    data.password = hashedPassword;

    const createdUser = await this.userRepository.create(data);

    await this.sendMail(createdUser);

    return createdUser;
  }
}
