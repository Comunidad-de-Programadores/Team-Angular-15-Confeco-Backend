// Imports modules.
import { Request } from "express";
import { HttpError } from "http-errors";

// Imports facades
import { AuthFacade } from "../../facade/auth/auth.facade";

// Imports interfaces.
import { IEmailVerificacionToken } from "../../interfaces/auth.interfaces";

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

    async register(req: Request): Promise<IEmailVerificacionToken | HttpError> {
        const data = await this.auth.register(req.body);

        // Inicialice strategy
        const mail: MailtrapConfirmEmail = new MailtrapConfirmEmail({
            from: "ivanzaldivar16@gmail.com",
            to: data.email,
            nickname: data.nickname,
            url: data.url,
            subject: "📧 Verifica la direccion de correo electronico con Team Angular 15",
        });

        // Send email.
        this.mail.send(mail);

        return data;
    }
};
