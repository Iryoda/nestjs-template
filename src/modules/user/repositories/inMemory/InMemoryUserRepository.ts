import { Prisma, User } from '@prisma/client';
import { IUserRepository } from '../IUserRepository';
import { v4 } from 'uuid';
import { UpdateUserDTO } from '../../dtos/updateUserDTO';

export class InMemoryUserRepository implements IUserRepository {
  private repo: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = Object.assign(data, {
      id: v4(),
      createAt: new Date(),
      updateAt: new Date(),
    });

    this.repo.push(user);

    return user;
  }

  async delete(id: string) {
    this.repo.find((user) => user.id !== id);
  }

  async findById(id: string) {
    const user = this.repo.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.repo.find((user) => user.email === email);
    return user;
  }

  async findAll() {
    return this.repo;
  }

  async update(id: string, data: UpdateUserDTO) {
    let updatedUser: User;

    const newRepo = this.repo.map((user) => {
      if (user.id === id) {
        updatedUser = Object.assign(user, data);
        return user;
      }
    });

    this.repo = newRepo;

    return updatedUser;
  }
}
