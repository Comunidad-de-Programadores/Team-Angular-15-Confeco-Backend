// Imports environments.
import { environments } from "../../../../config/environments";

// Imports interfaces.
import { UserDatabase } from "../../../../repositories/interfaces/entities.interfaces";
import { IAuth } from "../../interfaces/auth.interfaces";

// Imports modules.
import { User } from "../../../../models/User";

// Imports facades.
import { JsonWebToken } from "../../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtEmailToken } from "../../../../helpers/jsonwebtokens/strategies/JwtEmailToken";
import { JwtChangeEmail } from "../../../../helpers/jsonwebtokens/strategies/JwtChangeEmail";

// Imports mails.
import { Mail } from "../../../../mails/Mail";
import { MailtrapVerificacionEmail } from "../../../../mails/strategies/MailtrapVerificacionEmail";

// Imports repositories.
import { DatabaseRepository } from "../../../../repositories/DatabaseRepository";
import { UpdateEmail } from "../../../../repositories/user/write.user";

export class EmailReset implements IAuth<void> {
    private database: DatabaseRepository<UserDatabase>;
    private jsonwebtoken: JsonWebToken;
    private mail: Mail;

    constructor(private data: { email: string; token: string }) {
        this.database = new DatabaseRepository;
        this.jsonwebtoken = new JsonWebToken;
        this.mail = new Mail;
    }

    async auth(): Promise<void> {
        const payload: User = this.jsonwebtoken.verify(this.data.token, new JwtChangeEmail);

        // Update email user.
        await this.database.update(new UpdateEmail({
            key: payload._id,
            value: { email: this.data.email, status: false }
        }));

        // Generate token.
        const token: string = this.jsonwebtoken.generate({
            data: Object.assign({}, new User(payload))
        }, new JwtEmailToken);

        // Generate url
        const url: string = `${ environments.URL }/v1/auth/confirm_email/${ token }`;

        // Send email.
        await this.mail.send(new MailtrapVerificacionEmail({
            email: payload.email,
            nickname: payload.nickname,
            url
        }));
    }
}
