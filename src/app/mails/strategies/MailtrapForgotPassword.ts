// Imports modules.
import createTransport from "../../config/nodemailer";
import Mail from "nodemailer/lib/mailer";

// Imports interfaces.
import { IConfirmEmail, ISendMail } from "../../interfaces/mail.interfaces";

// Imports template.
import { forgotPasswordHtml } from "../template/forgotPassword";

export class MailtrapForgotPassword implements ISendMail {
    private mail: Mail;

    constructor(private data: IConfirmEmail) {
        this.mail = createTransport;
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
