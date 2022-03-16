import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtService } from '@nestjs/jwt';
import { FindUserService } from 'src/modules/user/services/findUserUseService.service';
import { HashProvider } from 'src/shared/providers/hashProvider/hashProvider.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserService: FindUserService,
    private readonly jwtService: JwtService,
    private readonly hashProvider: HashProvider,
  ) {}

  private async validatePassword(
    password: string,
    hash_password: string,
  ): Promise<boolean> {
    return await this.hashProvider.compare(password, hash_password);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    try {
      const user = await this.findUserService.byEmail(email);

      const validatePassword = await this.validatePassword(
        password,
        user.password,
      );

      if (validatePassword) {
        const {
          password: {},
          ...result
        } = user;
        return result;
      }
    } catch (e) {
      return null;
    }
  }

  async login(user: User) {
    const payload = { sub: user.id };

    return {
      acces_token: this.jwtService.sign(payload),
    };
  }
}
