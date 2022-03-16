import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Patch,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { User } from '../domain/User';
import { UpdateUserDTO } from '../dtos/updateUserDTO';
import { UpdateUserService } from '../services/updateUserService.service';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}

  @ApiOkResponse({ description: 'Updated an user', type: User })
  @Patch('user/update')
  async update(@Req() req: Request, @Body() data: UpdateUserDTO) {
    const id = req.user.id;

    const user = await this.updateUserService.handle(id, data);
    return new User(user);
  }
}
