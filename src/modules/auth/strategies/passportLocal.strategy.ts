import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthUseCase } from '../useCases/authUseCase.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authUseCase: AuthUseCase) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authUseCase.validateUser(email, password);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
