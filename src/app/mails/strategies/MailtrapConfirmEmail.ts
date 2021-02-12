// Imports modules.
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

// Imports environments.
import { environments } from "../../config/environments";

// Imports interfaces.
import { IMailConfirmEmail, ISendMail } from "../../interfaces/mail.interfaces";

// Import template
import { confirmEmailHtml } from "../template/ConfirmEmailHtml";

export class MailtrapConfirmEmail implements ISendMail {
    private mail: Mail;

    constructor(private email: IMailConfirmEmail) {
        this.mail = nodemailer.createTransport({
            host: environments.MAILTRAP_HOST,
            port: Number(environments.MAILTRAP_PORT),
            auth: {
                user: environments.MAILTRAP_USER,
                pass: environments.MAILTRAP_PASS
            }
        });
    }

    async send(): Promise<void> {
        // Generate template.
        const { from, to, subject, text, nickname, url } = this.email;
        const html: string = confirmEmailHtml({ nickname, url });

        // Send mail.
        await this.mail.sendMail({ from, to, subject, text, html });
    }
}
