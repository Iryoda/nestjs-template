import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/filters/http-execption.filter';
import { UserModule } from './modules/user/module/user.module';
import { AuthModule } from './modules/auth/module/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './shared/guards/auth/jwt-auth.guard';

@Module({
  imports: [UserModule, AuthModule],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
