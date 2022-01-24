import { Injectable } from '@nestjs/common';
import { UpdateUserDTO } from '../dtos/updateUserDTO';
import { UserRepository } from '../repositories/userRepository';

@Injectable()
export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async handle(id: string, data: UpdateUserDTO) {
    const user = await this.userRepository.update(id, data);
    return user;
  }
}
