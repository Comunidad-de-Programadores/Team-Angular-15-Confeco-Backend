// Imports modules.
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

// Imports environments.
import { environments } from "../../config/environments";

// Imports interfaces.
import { ISendMail } from "../../interfaces/mail.interfaces";

export class MailtrapConfirmEmail implements ISendMail {
    constructor(private nickname: string, private url: string) {}
    async send(): Promise<void> {}
}
