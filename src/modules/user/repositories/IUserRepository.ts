import { Prisma } from '@prisma/client';
import { User } from '../domain/User';
import { UpdateUserDTO } from '../dtos/updateUserDTO';

export interface IUserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;

  update(id: string, data: UpdateUserDTO): Promise<User>;

  delete(id: string): Promise<void>;

  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
}
