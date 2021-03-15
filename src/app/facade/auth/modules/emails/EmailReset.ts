// Imports environments.
import { environments } from "../../../../config/environments";

// Imports interfaces.
import { UserDatabase } from "../../../../repositories/interfaces/entities.interfaces";
import { IAuth } from "../../interfaces/auth.interfaces";

// Imports modules.
import { User } from "../../../../models/User";

// Imports facades.
import { JwtFacade } from "../../../Jwt/JwtFacade";

// Imports mails.
import { Mail } from "../../../../mails/Mail";
import { MailtrapVerificacionEmail } from "../../../../mails/strategies/MailtrapVerificacionEmail";

// Imports repositories.
import { DatabaseRepository } from "../../../../repositories/DatabaseRepository";
import { UpdateEmail } from "../../../../repositories/user/write.user";

export class EmailReset implements IAuth<void> {
    private database: DatabaseRepository<string, UserDatabase>;
    private jwt: JwtFacade;
    private mail: Mail;

    constructor(private data: { email: string; token: string }) {
        this.database = new DatabaseRepository;
        this.jwt = new JwtFacade;
        this.mail = new Mail;
    }

    async auth(): Promise<void> {
        const payload: User = this.jwt.checkEmailResetToken(this.data.token);

        // Update email user.
        await this.database.update(new UpdateEmail({
            key: payload._id,
            value: { email: this.data.email, status: false }
        }));

        // Generate token.
        const token = this.jwt.generateEmailConfirmationLink(payload);

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
