// Imports modules.
import createHttpError from "http-errors";

// Imports environments.
import { environments } from "../../../../config/environments";

// Imports interfaces.
import { User } from "../../../../models/User";
import { IAuth } from "../../interfaces/auth.interfaces";
import { IEncrypt } from "../../../../helpers/encryptors/interfaces/encrypt.interface";
import { UserDatabase } from "../../../../repositories/interfaces/entities.interfaces";

// Imports mails.
import { Mail } from "../../../../mails/Mail";
// import { SendgridForgotPassword } from "../../../mails/strategies/SendgridForgotPassword";
import { MailtrapForgotPassword } from "../../../../mails/strategies/MailtrapForgotPassword";

// Imports facades.
import { JwtFacade } from "../../../Jwt/JwtFacade";

// Imports repositories.
import { DatabaseRepository } from "../../../../repositories/DatabaseRepository";
import { GetUserByEmail } from "../../../../repositories/user/read.user";
import { UpdateUser } from "../../../../repositories/user/write.user";

export class ForgotPassword implements IAuth<void> {
    private database: DatabaseRepository<string, UserDatabase>;
    private mail: Mail;
    private jwt: JwtFacade;

    constructor(private encryptor: IEncrypt, private email: string) {
        this.database = new DatabaseRepository;
        this.mail = new Mail();
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<void> {
        const data: UserDatabase | null = await this.database.get(this.email, new GetUserByEmail);

        if (!data) throw createHttpError(403, "El email no existe.", {
            name: "NonExistentEmail"
        });

        if (!data.verified_email) throw createHttpError(401, "Necesitas verificar tu email, para realizar esta accion.", {
            name: "UnverifiedEmail"
        });

        // Generate tokens.
        const user: User = Object.assign({}, new User(data));
        const token: string = this.jwt.generatePasswordResetToken(user);

        // Encrypt token.
        const tokenEncrypted: string = await this.encryptor.encrypt(token);

        // Update password reset tokens.
        await this.database.update(
            data._id,
            { ...user, password: data.password, passwordResetToken: tokenEncrypted },
            new UpdateUser
        );

        // Send email.
        const { nickname, email } = user;
        const url: string = `${ environments.URL }/v1/auth/password/reset/${ token }`;
        this.mail.send(new MailtrapForgotPassword({ email, nickname, url }));
    }
};
