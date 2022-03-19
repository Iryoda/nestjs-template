import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { LocalAuthGuard } from 'src/shared/guards/auth/local-auth.guard';
import { LogInResponseDTO } from '../dtos/login-response.dto';
import { LogInUserDTO } from '../dtos/login-user.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Session')
@Public()
@Controller()
export class AuthController {
  constructor(private authUseCase: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LogInUserDTO })
  @ApiResponse({ status: 200, type: LogInResponseDTO })
  @Post('auth/login')
  async login(@Request() req: any) {
    return await this.authUseCase.login(req.user);
  }
}
