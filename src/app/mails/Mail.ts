// Imports interfaces.
import { IMail } from "../interfaces/mail.interfaces";

export class Mail {
    async send(mail: IMail): Promise<void> {
        mail.send();
    }
}
