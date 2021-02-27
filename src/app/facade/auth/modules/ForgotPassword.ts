// Imports modules.
import createHttpError from "http-errors";

// Imports environments.
import { environments } from "../../../config/environments";

// Imports interfaces.
import { User } from "../../../models/User";
import { IAuth } from "../interfaces/auth.interfaces";
import { IEncrypt } from "../../../helpers/encryptors/interfaces/encrypt.interface";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports mails.
import { Mail } from "../../../mails/Mail";
// import { SendgridForgotPassword } from "../../../mails/strategies/SendgridForgotPassword";
import { MailtrapForgotPassword } from "../../../mails/strategies/MailtrapForgotPassword";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";

export class ForgotPassword implements IAuth<void> {
    private mail: Mail;
    private jwt: JwtFacade;

    constructor(
        private repository: IDatabaseUserRepository,
        private encryptor: IEncrypt,
        private email: string
    ) {
        this.mail = new Mail();
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<void> {
        const data = await this.repository.getByEmail(this.email);

        if (!data) throw createHttpError(403, "El email no existe.", {
            name: "NonExistentEmail"
        });

        if (!data.verified_email) throw createHttpError(401, "Necesitas verificar tu email, para realizar esta accion.", {
            name: "UnverifiedEmail"
        });

        // Generate tokens.
        const user = Object.assign({}, new User(data));
        const token = this.jwt.generatePasswordResetToken(user);

        // Encrypt token.
        const tokenEncrypted = await this.encryptor.encrypt(token);

        // Update password reset tokens.
        await this.repository.updatePasswordResetToken(user._id, tokenEncrypted);

        // Send email.
        const { nickname, email } = user;
        const url = `${ environments.URL }/v1/auth/password/reset/${ token }`;
        this.mail.send(new MailtrapForgotPassword({ email, nickname, url }));
    }
};
