// Imports modules.
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

// Imports environments.
import { environments } from "../../config/environments";

// Imports interfaces.
import { IMail, ISendMail } from "../../interfaces/mail.interfaces";

// Import template
import { PasswordResetHtml } from "../template/PasswordReset";

export class MailtrapConfirmEmail implements ISendMail {
    private nickname: string;
    private url: string;
    private mail: Mail;

    constructor(nickname: string, url: string) {
        this.nickname = nickname;
        this.url = url;
        this.mail = nodemailer.createTransport({
            host: environments.MAILTRAP_HOST,
            port: Number(environments.MAILTRAP_PORT),
            auth: {
                user: environments.MAILTRAP_USER,
                pass: environments.MAILTRAP_PASS
            }
        });
    }

    async send(email: IMail): Promise<void> {
        // Generate template.
        const { from, to, subject, text } = email;
        const html: string = PasswordResetHtml({
            nickname: this.nickname,
            url: this.url
        });

        // Send mail.
        await this.mail.sendMail({ from, to, subject, text, html });
    }
}
