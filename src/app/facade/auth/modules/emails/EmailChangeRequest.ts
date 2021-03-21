// Imports interfaces.
import { IConfirmEmail } from "../../../../mails/interfaces/mail.interfaces";
import { IAuth } from "../../interfaces/auth.interfaces";

// Imports models.
import { User } from "../../../../models/User";

// Import helper.
import { GenerateLink } from "../../../../helpers/GenerateLink";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtChangeEmail } from "../../../../helpers/jsonwebtokens/strategies/JwtChangeEmail";

// Imports mails.
import { Mail } from "../../../../mails/Mail";
import { SendgridChangeEmail } from "../../../../mails/strategies/SendgridChangeEmail";

export class EmailChangeRequest implements IAuth<any> {
    private jsonwebtoken: JsonWebToken;
    private generateLink: GenerateLink;
    private mail: Mail;

    constructor(private user: User) {
        this.jsonwebtoken = new JsonWebToken;
        this.generateLink = new GenerateLink;
        this.mail = new Mail;
    }

    async auth(): Promise<IConfirmEmail> {
        const { email, nickname } = this.user;
        const user: User = Object.assign({}, new User(this.user));
        
        // Generate token.
        const token: string = this.jsonwebtoken.generate({ data: user }, new JwtChangeEmail);

        // Generate url.
        const url: string = this.generateLink.resetEmail(token);
        
        // Send email.
        const payload: IConfirmEmail = { nickname, email, url };
        await this.mail.send(new SendgridChangeEmail(payload));
        return payload;
    }
}
