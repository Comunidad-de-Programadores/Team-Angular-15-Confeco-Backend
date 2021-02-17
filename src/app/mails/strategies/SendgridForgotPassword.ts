// Import sendgrid
import sendgrid from "../../config/sendgrid";

// Imports interfaces.
import { IConfirmEmail, ISendMail } from "../../interfaces/mail.interfaces";
import { forgotPasswordHtml } from "../template/forgotPassword";

export class SendgridForgotPassword implements ISendMail {
    constructor(private data: IConfirmEmail) {}

    async send(): Promise<void> {
        sendgrid.send({
            from: "ivanzaldivar16@gmail.com",
            to: this.data.email,
            subject: "Cambio de contraseña",
            text: "Ha realizado una solicitud de cambio de contraseña, solo sigue las instrucciones y tendremos todo listo",
            html: forgotPasswordHtml(this.data)
        });
    }
}