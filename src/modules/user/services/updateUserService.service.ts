import { Injectable } from '@nestjs/common';
import { UpdateUserDTO } from '../dtos/updateUserDTO';

import { IUserRepository } from '../repositories/IUserRepository';

@Injectable()
export class UpdateUserService {
  constructor(private userRepository: IUserRepository) {}

  async handle(id: string, data: UpdateUserDTO) {
    const user = await this.userRepository.update(id, data);
    return user;
  }
}
