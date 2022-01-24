
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/shared/decorators/public.decorator';
import { LocalAuthGuard } from 'src/shared/guards/auth/local-auth.guard';
import { AuthUseCase } from '../useCases/authUseCase.service';

@Controller()
export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return await this.authUseCase.login(req.user);
  }
}
