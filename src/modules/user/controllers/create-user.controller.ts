import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { User } from '../domain/user.entity';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserService } from '../services/create-user.service';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Public()
  @Post('user/create')
  @ApiCreatedResponse({ description: 'Create an user succesfully', type: User })
  async create(@Body() data: CreateUserDTO) {
    const user = await this.createUserService.handle(data);
    return new User(user);
  }
}
