// Imports environments.
import { environments } from "../../../../config/environments";

// Imports interfaces.
import { IConfirmEmail } from "../../../../mails/interfaces/mail.interfaces";
import { IAuth } from "../../interfaces/auth.interfaces";

// Imports models.
import { User } from "../../../../models/User";

// Imports facades.
import { JwtFacade } from "../../../Jwt/JwtFacade";

// Imports mails.
import { Mail } from "../../../../mails/Mail";
import { MailtrapChangeEmail } from "../../../../mails/strategies/MailtrapChangeEmail";

export class EmailChangeRequest implements IAuth<any> {
    private jwt: JwtFacade;
    private mail: Mail;

    constructor(private user: User) {
        this.jwt = new JwtFacade;
        this.mail = new Mail;
    }

    async auth(): Promise<IConfirmEmail> {
        // Generate token.
        const { email, nickname } = this.user;
        const user: User = Object.assign({}, new User(this.user));
        const token: string = this.jwt.generateEmailChangeToken(user);

        // Generate url.
        const url: string = `${ environments.URL }/v1/auth/email/reset/${ token }`;
        
        // Send email.
        const payload: IConfirmEmail = { nickname, email, url };
        await this.mail.send(new MailtrapChangeEmail(payload));

        return payload;
    }
}
