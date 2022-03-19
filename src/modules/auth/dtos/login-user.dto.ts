import { IsEmail, IsString } from 'class-validator';

export class LogInUserDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
