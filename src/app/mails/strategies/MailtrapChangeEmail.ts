// Imports nodemailre
import Mail from "nodemailer/lib/mailer";
import createTransport from "../../config/nodemailer";

// Imports interfaces.
import { IConfirmEmail, ISendMail } from "../interfaces/mail.interfaces";

// Imports templates
import { changeEmail } from "../template/changeEmail";

export class MailtrapChangeEmail implements ISendMail {
    private transport: Mail;

    constructor(private data: IConfirmEmail) {
        this.transport = createTransport;
    }

    async send(): Promise<void> {
        await this.transport.sendMail({
            from: "support@teamangular15",
            to: this.data.email,
            subject: "Cambio de correo electronico.",
            text: "Has realizado una peticion para cambiar tu correo electronico.",
            html: changeEmail(this.data)
        });
    }
}
