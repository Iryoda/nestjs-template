import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  username?: string;
}