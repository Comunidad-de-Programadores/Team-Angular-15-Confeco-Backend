// Imports modules.
import createTransport from "../../config/nodemailer";
import Mail from "nodemailer/lib/mailer";

// Imports interfaces.
import { IConfirmEmail, ISendMail } from "../../interfaces/mail.interfaces";
import { confirmEmail } from "../template/confirmEmail";

export class MailtrapVerificacionEmail implements ISendMail {
    private transport: Mail;

    constructor(private data: IConfirmEmail) {
        this.transport = createTransport;
    }

    async send() {
        this.transport.sendMail({
            from: "support@teamangular15",
            to: this.data.email,
            subject: "Verificacion de correo electronico",
            text: "Solo tienes que seguir los pasos correctamente, y estara todo listo.",
            html: confirmEmail(this.data)
        });
    }
};
