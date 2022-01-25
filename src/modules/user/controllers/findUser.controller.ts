import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../domain/User';
import { FindUserUseCase } from '../useCases/findUserUseCase.service';

@ApiTags('User')
@Controller()
export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ type: User })
  @Get('users/:id')
  async byId(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.findUserUseCase.byId(id);

    return new User(user);
  }
}
