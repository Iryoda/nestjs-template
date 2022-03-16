import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/filters/http-execption.filter';
import { UserModule } from './modules/user/module/user.module';
import { AuthModule } from './modules/auth/module/auth.module';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [UserModule, AuthModule],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}
