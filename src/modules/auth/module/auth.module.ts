import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/module/user.module';
import { AuthController } from '../controllers/authController.controller';
import { HashProvider } from 'src/shared/providers/hashProvider/hashProvider.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/passportLocal.strategy';
import { AuthUseCase } from '../useCases/authUseCase.service';
import auth from 'src/config/auth';

const { secret, expiresIn } = auth;

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({ secret, signOptions: { expiresIn } }),
  ],
  controllers: [AuthController],
  providers: [AuthUseCase, LocalStrategy, JwtStrategy, HashProvider],
  exports: [AuthUseCase],
})
export class AuthModule{}