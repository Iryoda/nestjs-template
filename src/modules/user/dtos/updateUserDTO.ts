import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @ApiProperty()
  username?: string;
}
