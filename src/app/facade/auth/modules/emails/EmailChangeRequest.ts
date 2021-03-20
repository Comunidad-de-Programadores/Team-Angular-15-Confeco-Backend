// Imports environments.
import { environments } from "../../../../config/environments";

// Imports interfaces.
import { IConfirmEmail } from "../../../../mails/interfaces/mail.interfaces";
import { IAuth } from "../../interfaces/auth.interfaces";

// Imports models.
import { User } from "../../../../models/User";

// Imports facades.
import { JsonWebToken } from "../../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtChangeEmail } from "../../../../helpers/jsonwebtokens/strategies/JwtChangeEmail";

// Imports mails.
import { Mail } from "../../../../mails/Mail";
import { MailtrapChangeEmail } from "../../../../mails/strategies/MailtrapChangeEmail";

export class EmailChangeRequest implements IAuth<any> {
    private jsonwebtoken: JsonWebToken;
    private mail: Mail;

    constructor(private user: User) {
        this.jsonwebtoken = new JsonWebToken;
        this.mail = new Mail;
    }

    async auth(): Promise<IConfirmEmail> {
        const { email, nickname } = this.user;
        const user: User = Object.assign({}, new User(this.user));
        
        // Generate token.
        const token: string = this.jsonwebtoken.generate({ data: user }, new JwtChangeEmail);

        // Generate url.
        const url: string = `${ environments.URL }/v1/auth/email/reset/${ token }`;
        
        // Send email.
        const payload: IConfirmEmail = { nickname, email, url };
        await this.mail.send(new MailtrapChangeEmail(payload));
        return payload;
    }
}
