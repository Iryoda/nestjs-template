import { NotFoundException } from '@nestjs/common';

export class NotFoundError extends NotFoundException {
  constructor(target: string) {
    const message = `${target} not found`;
    super(message);
  }
}
