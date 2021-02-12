// Imports interfaces.
import { ISendMail, IMail } from "../interfaces/mail.interfaces";

export class Mail {
    async send(data: IMail, mail: ISendMail): Promise<void> {
        mail.send(data);
    }
}
