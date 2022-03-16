import { Prisma } from '@prisma/client';
import { User } from '../domain/User';
import { UpdateUserDTO } from '../dtos/updateUserDTO';

export abstract class IUserRepository {
  abstract create(data: Prisma.UserCreateInput): Promise<User>;

  abstract update(id: string, data: UpdateUserDTO): Promise<User>;

  abstract delete(id: string): Promise<void>;

  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
}
