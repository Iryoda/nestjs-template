import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../domain/user.entity';

import { FindUserService } from '../services/find-user.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('User')
@Controller()
export class FindUserController {
  constructor(private findUserService: FindUserService) {}

  @ApiOkResponse({ description: 'Return a user', type: User })
  @Get('user/:id')
  async byId(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.findUserService.byId(id);

    return new User(user);
  }
}
