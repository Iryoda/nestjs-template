import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../domain/User';
import { UpdateUserDTO } from '../dtos/updateUserDTO';
import { UpdateUserUseCase } from '../useCases/updateUserUseCase.service';

@Controller()
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('users/:id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    const user = await this.updateUserUseCase.handle(id, data);
    return new User(user);
  }
}
