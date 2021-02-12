// Imports modules.
import nodemailer from "nodemailer";

// Imports environments.
import { environments } from "../../config/environments";

// Imports interfaces.
import { IMail } from "../../interfaces/mail.interfaces";

// Imports mails
import Mail from "nodemailer/lib/mailer";
import { OfferMailHTML } from "../template/OfferMail";

export class Mailtrap implements IMail {
    mail: Mail;

    constructor() {
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
        const html = OfferMailHTML({ email: "melissa444@gmail.com", url: "https://google.com" });
        await this.mail.sendMail({
            from: "ivanzaldivar16@gmail.com",
            to: "melissa999@gmail.com",
            subject: "Prueba con Nodejs",
            html: html
        });
    }
}
