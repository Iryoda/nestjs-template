import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/filters/http-execption.filter';

import { UserModule } from './modules/user/module/user.module';
import { AuthModule } from './modules/auth/module/auth.module';
import { MailModule } from './shared/providers/mailerProvider/mail.module';
import { CreateUserService } from './modules/user/services/create-user.service';
import { FindUserController } from './modules/user/controllers/find-user.controller';

@Module({
  imports: [AuthModule, UserModule, MailModule],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    CreateUserService,
  ],
  controllers: [FindUserController],
})
export class AppModule {}
