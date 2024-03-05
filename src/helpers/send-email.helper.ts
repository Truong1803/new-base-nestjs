import { join } from 'path';

import NodeMailer, { SentMessageInfo } from 'nodemailer';
import * as hbs from 'express-handlebars';
import {
  ADMIN_EMAIL,
  ADMIN_EMAIL_NAME,
  ADMIN_PASSWORD_EMAIL,
} from 'src/constants';
import { IEmailBody } from 'src/interfaces';

const mailHost = 'smtp.gmail.com';
const mailPort = 465;

export class SendEmailHelper {
  private static async sendMail(
    to: string,
    subject: string,
    content: string,
  ): Promise<SentMessageInfo> {
    const transporter = NodeMailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: true,
      auth: {
        user: ADMIN_EMAIL,
        pass: ADMIN_PASSWORD_EMAIL,
      },
    });

    const options = {
      from: {
        name: ADMIN_EMAIL_NAME,
        address: ADMIN_EMAIL,
      },
      to,
      subject,
      html: content,
    };

    const result = await transporter.sendMail(options);
    return result;
  }

  static async sendOTP(payload: IEmailBody): Promise<string> {
    const { to, subject, OTP } = payload;
    const hbsTemplate = hbs.create();
    const content = await hbsTemplate.render(
      join(__dirname, '../../src/views/send-otp.hbs'),
      {
        otp: OTP,
      },
    );
    return this.sendMail(to, subject, content);
  }
}
