// Imports interfaces.
import { ISendMail, IMail } from "../interfaces/mail.interfaces";

export class Mail {
    async send(mail: ISendMail): Promise<void> {
        mail.send();
    }
}
