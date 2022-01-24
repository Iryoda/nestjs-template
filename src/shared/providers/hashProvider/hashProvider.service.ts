import { hash, compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashProvider {
  async hash(data: string) {
    return await hash(data, 8);
  }

  async compare(data: string, hash: string) {
    return await compare(data, hash);
  }
}
