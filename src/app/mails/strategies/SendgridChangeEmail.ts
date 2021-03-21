// Import sendgrid
import sendgrid from "../../config/sendgrid";

// Import environments.
import { environments } from "../../config/environments";

// Import interface.
import { IConfirmEmail, ISendMail } from "../interfaces/mail.interfaces";

// Import template
import { changeEmail } from "../template/changeEmail";

export class SendgridChangeEmail implements ISendMail {
    constructor(private data: IConfirmEmail) {}

    async send(): Promise<void> {
        await sendgrid.send({
            from: environments.SENDGRID_FROM_EMAIL as string,
            to: this.data.email,
            subject: "Cambio de correo electronico.",
            text: "Has realizado una peticion para cambiar tu correo electronico.",
            html: changeEmail(this.data)
        });
    }
}
