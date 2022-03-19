import { ApiProperty } from '@nestjs/swagger';
import { User as PrismaUser } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class User implements PrismaUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  createAt: Date;

  @Exclude()
  updateAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
