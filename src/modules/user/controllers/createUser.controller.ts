import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserUseCase } from '../useCases/createUserUseCase.service';
import { User } from '../domain/User';
import { CreateUserDTO } from '../dtos/createUserDTO';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller()
export class CreateUserController {
  constructor(private createUserService: CreateUserUseCase) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('users')
  @ApiCreatedResponse({ type: User })
  async create(@Body() data: CreateUserDTO) {
    const user = await this.createUserService.handle(data);
    return new User(user);
  }
}
