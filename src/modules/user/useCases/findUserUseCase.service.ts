import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/shared/errors/notFound';
import { UserRepository } from '../repositories/userRepository';

@Injectable()
export class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async byId(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundError('User');

    return user;
  }

  async byEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFoundError('User');

    return user;
  }

  async all() {
    const users = await this.userRepository.findAll();

    return users;
  }
}
