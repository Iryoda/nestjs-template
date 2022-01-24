import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UpdateUserDTO } from '../dtos/updateUserDTO';
import { IUserRepository } from './IUserRepository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data });
  }

  async delete(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async update(id: string, data: UpdateUserDTO) {
    return await this.prisma.user.update({
      where: { id },
      data: data,
    });
  }
}
