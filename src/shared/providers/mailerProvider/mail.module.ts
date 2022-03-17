import { resolve } from 'path';

import { Global, Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import mailer from 'src/config/mailer';

const { defaults, transport, preview } = mailer;

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport,
      defaults,
      preview,
      template: {
        dir: resolve(__dirname, '..', '..', "..",'template'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class MailModule {}
