import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../domain/User';
import { FindUserUseCase } from '../useCases/findUserUseCase.service';

@Controller()
export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('users/:id')
  async byId(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.findUserUseCase.byId(id);

    return new User(user);
  }
}
