import { BadRequestException } from '@nestjs/common';

export class AlreadyExistError extends BadRequestException {
  constructor(target: string) {
    const message = `${target} already exists`;
    super(message);
  }
}
