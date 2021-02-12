// Imports modules.
import { Request } from "express";
import { HttpError } from "http-errors";

// Imports facades
import { AuthFacade } from "../../facade/auth/auth.facade";

// Imports mails
import { Mail } from "../../mails/Mail";
import { MailtrapConfirmEmail } from "../../mails/strategies/MailtrapConfirmEmail";

export class AuthPostmanComponent {
    private auth: AuthFacade;
    private mail: Mail;

    constructor() {
        this.auth = new AuthFacade();
        this.mail = new Mail();
    }

    async register(req: Request): Promise<object | HttpError> {
        const { email,  nickname, url } = await this.auth.register(req.body);

        // Send email.
        this.mail.send(
            {
                from: "ivanzaldivar16@gmail.com",
                to: email,
                subject: "📧 Verifica la direccion de correo electronico con Team Angular 15"
            },
            new MailtrapConfirmEmail(nickname, url)
        );

        return { nickname };
    }

    async verifyEmail(req: Request) {
        return await this.auth.verifyEmail(req.params.token);
    }
};
