// Import sendgrid
import sendgrid from "../../config/sendgrid";

// Imports interfaces.
import { IConfirmEmail, ISendMail } from "../../interfaces/mail.interfaces";
import { confirmEmail } from "../template/confirmEmail";

export class SendgridVerificationEmail implements ISendMail {
    constructor(private data: IConfirmEmail) {}

    async send(): Promise<void> {
        sendgrid.send({
            from: "ivanzaldivar16@gmail.com",
            to: this.data.email,
            subject: "Verificacion de correo electronico",
            text: "Solo tienes que seguir los pasos correctamente, y estara todo listo.",
            html: confirmEmail(this.data)
        })
        .then(() => console.log("Email send"))
        .catch(console.error);
    }
};