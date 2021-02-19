// Imports modules.
import createHttpError from "http-errors";

// Imports environments.
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IAuth } from "../interfaces/auth.interfaces";
import { IEncrypt } from "../../../helpers/encryptors/interfaces/encrypt.interface";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports mails.
import { Mail } from "../../../mails/Mail";
import { SendgridForgotPassword } from "../../../mails/strategies/SendgridForgotPassword";

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
        const user = await this.repository.getByEmail(this.email);

        if (!user) throw createHttpError(403, "El email no existe.", {
            name: "NonExistentEmail"
        });

        if (!user.verified_email) throw createHttpError(401, "Necesitas verificar tu email, para realizar esta accion.", {
            name: "UnverifiedEmail"
        });

        // Generate tokens.
        const token = this.jwt.generatePasswordResetToken({ _id: user._id, email: user.email });

        // Encrypt token.
        const tokenEncrypted = await this.encryptor.encrypt(token);

        // Update password reset tokens.
        await this.repository.updatePasswordResetToken(user._id, tokenEncrypted);

        // Send email.
        this.mail.send(new SendgridForgotPassword({
            nickname: user.nickname,
            email: user.email,
            url: `${ environments.URL }/v1/auth/password/reset/${ token }`
        }));
    }
};
