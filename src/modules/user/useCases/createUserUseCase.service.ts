import { Injectable } from '@nestjs/common';
import { AlreadyExistError } from 'src/shared/errors/alreadyExist';
import { HashProvider } from 'src/shared/providers/hashProvider/hashProvider.service';
import { CreateUserDTO } from '../dtos/createUserDTO';
import { UserRepository } from '../repositories/userRepository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashProvider: HashProvider,
  ) {}

  async handle(data: CreateUserDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (user) throw new AlreadyExistError('Email');

    const hashedPassword = await this.hashProvider.hash(data.password);

    data.password = hashedPassword;

    return this.userRepository.create(data);
  }
}
