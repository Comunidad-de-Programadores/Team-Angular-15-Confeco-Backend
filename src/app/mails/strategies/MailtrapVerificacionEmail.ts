// Imports modules.
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

// Imports environments
import { environments } from "../../config/environments";

// Imports interfaces.
import { IConfirmEmail, IMail, ISendMail } from "../../interfaces/mail.interfaces";
import { confirmEmail } from "../template/confirmEmail";

export class MailtrapVerificacionEmail implements ISendMail {
    private transport: Mail;

    constructor(private data: IConfirmEmail) {
        this.transport = createTransport({
            host: environments.MAILTRAP_HOST,
            port: Number(environments.MAILTRAP_PORT),
            auth: {
                user: environments.MAILTRAP_USER,
                pass: environments.MAILTRAP_PASS
            }
        });
    }

    async send() {
        this.transport.sendMail({
            from: "support@teamangular15",
            to: this.data.email,
            subject: "Cambio de contraseña",
            text: "Ha realizado una solicitud de cambio de contraseña, solo sigue las instrucciones y tendremos todo listo.",
            html: confirmEmail(this.data)
        });
    }
};
