import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  @ApiProperty()
  password: string;

  static create(data?: Partial<CreateUserDTO>) {
    const userObject = {
      email: 'any_email@mail.com',
      password: 'any_password',
      username: 'any_username',
    };

    const user = Object.assign(userObject, data);

    return user;
  }
}
