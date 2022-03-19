import { ISendMailOptions } from '@nestjs-modules/mailer';

export class MailServiceMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendMail(_sendMailOptions: ISendMailOptions) {
    return true;
  }
}
