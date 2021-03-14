// Imports environments.
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";
import { IAuth } from "../interfaces/auth.interfaces";

// Imports modules.
import { User } from "../../../models/User";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";

// Imports mails.
import { Mail } from "../../../mails/Mail";
import { MailtrapVerificacionEmail } from "../../../mails/strategies/MailtrapVerificacionEmail";

export class EmailReset implements IAuth<void> {
    private jwt: JwtFacade;
    private mail: Mail;

    constructor(
        private repository: IDatabaseUserRepository,
        private data: { email: string; token: string }
    ) {
        this.jwt = new JwtFacade;
        this.mail = new Mail;
    }

    async auth(): Promise<void> {
        const payload: User = this.jwt.checkEmailResetToken(this.data.token);

        // Update email user.
        await this.repository.updateEmail(
            payload._id,
            { email: this.data.email, emailStatus: false }
        );

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
