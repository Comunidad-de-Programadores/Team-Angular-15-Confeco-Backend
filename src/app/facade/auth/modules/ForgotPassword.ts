// Imports modules.
import createHttpError from "http-errors";
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IAuth } from "../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports mails.
import { Mail } from "../../../mails/Mail";
import { SendgridForgotPassword } from "../../../mails/strategies/SendgridForgotPassword";

// Imports facades
import { PasswordFacade } from "../../password/PasswordFacade";

export class ForgotPassword implements IAuth<void> {
    private mail: Mail;
    private password: PasswordFacade;

    constructor(
        private repository: IDatabaseUserRepository,
        private email: string
    ) {
        this.mail = new Mail();
        this.password = new PasswordFacade();
    }

    async auth(): Promise<void> {
        const user = await this.repository.getByEmail(this.email);

        if (!user) throw createHttpError(403, "El email no existe.", {
            name: "NonExistentEmail"
        });

        if (!user.verified_email) throw createHttpError(401, "Necesitas verificar tu email, para realizar esta accion.", {
            name: "UnverifiedEmail"
        });

        // Generate token.
        const token: string = await this.password.generatePasswordResetToken(user.email);

        // Send email.
        this.mail.send(new SendgridForgotPassword({
            nickname: user.nickname,
            email: user.email,
            url: `${ environments.URL }/v1/auth/password/reset/${ token }`
        }));
    }
};
