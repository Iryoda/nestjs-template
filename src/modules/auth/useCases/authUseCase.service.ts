import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { FindUserUseCase } from 'src/modules/user/useCases/findUserUseCase.service';
import { HashProvider } from 'src/shared/providers/hashProvider/hashProvider.service';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
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
      const user = await this.findUserUseCase.byEmail(email);

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
