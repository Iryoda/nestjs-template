import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { LocalAuthGuard } from 'src/shared/guards/auth/local-auth.guard';
import { LogInResponseDTO } from '../dtos/logInResponseDTO';
import { LogInUserDTO } from '../dtos/logInUserDTO';
import { AuthUseCase } from '../useCases/authUseCase.service';

@ApiTags('Session')
@Controller()
export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ type: LogInUserDTO })
  @ApiResponse({ status: 200, type: LogInResponseDTO })
  async login(@Request() req: any) {
    return await this.authUseCase.login(req.user);
  }
}
