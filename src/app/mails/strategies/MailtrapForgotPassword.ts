// Imports modules.
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { environments } from "../../config/environments";

// Imports interfaces.
import { IConfirmEmail, IMail, ISendMail } from "../../interfaces/mail.interfaces";

// Imports template.
import { forgotPasswordHtml } from "../template/forgotPassword";

export class MailtrapForgotPassword implements ISendMail {
    private mail: Mail;

    constructor(private data: IConfirmEmail) {
        this.mail = createTransport({
            host: environments.MAILTRAP_HOST,
            port: Number(environments.MAILTRAP_PORT),
            auth: {
                user: environments.MAILTRAP_USER,
                pass: environments.MAILTRAP_PASS
            }
        });
    }

    async send(): Promise<void> {
        this.mail.sendMail({
            from: "support@teamangular15",
            to: this.data.email,
            subject: "Cambio de contraseña",
            text: "Ha realizado una solicitud de cambio de contraseña, solo sigue las instrucciones y tendremos todo listo.",
            html: forgotPasswordHtml(this.data)
        });
    }
};
