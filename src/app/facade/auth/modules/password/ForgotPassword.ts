// Imports modules.
import createHttpError from "http-errors";

// Imports interfaces.
import { IAuth } from "../../interfaces/auth.interfaces";
import { IEncrypt } from "../../../../helpers/encryptors/interfaces/encrypt.interface";
import { UserDatabase } from "../../../../repositories/interfaces/entities.interfaces";

// Import model.
import { User } from "../../../../models/User";

// Imports mails.
import { Mail } from "../../../../mails/Mail";
import { SendgridForgotPassword } from "../../../../mails/strategies/SendgridForgotPassword";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtPasswordToken } from "../../../../helpers/jsonwebtokens/strategies/JwtPasswordToken";

// Imports repositories.
import { DatabaseRepository } from "../../../../repositories/DatabaseRepository";
import { GetUserByEmail } from "../../../../repositories/user/read.user";
import { UpdatePasswordResetToken } from "../../../../repositories/user/write.user";
import { GenerateLink } from "../../../../helpers/GenerateLink";

export class ForgotPassword implements IAuth<void> {
    private database: DatabaseRepository<UserDatabase>;
    private jsonwebtoken: JsonWebToken;
    private generateLink: GenerateLink;
    private mail: Mail;

    constructor(private encryptor: IEncrypt, private email: string) {
        this.database = new DatabaseRepository;
        this.jsonwebtoken = new JsonWebToken;
        this.generateLink = new GenerateLink;
        this.mail = new Mail();
    }

    async auth(): Promise<void> {
        const data: UserDatabase | null = await this.database.get(new GetUserByEmail(this.email));

        if (!data) throw createHttpError(403, "El email no existe.", {
            name: "NonExistentEmail"
        });

        if (!data.verified_email) throw createHttpError(401, "Necesitas verificar tu email, para realizar esta accion.", {
            name: "UnverifiedEmail"
        });

        // Generate tokens.
        const user: User = Object.assign({}, new User(data));
        const token: string = this.jsonwebtoken.generate({ data: user }, new JwtPasswordToken);

        // Encrypt token.
        const tokenEncrypted: string = await this.encryptor.encrypt(token);

        // Update password reset tokens.
        await this.database.update(new UpdatePasswordResetToken({
            key: data._id,
            value: tokenEncrypted
        }));

        // Send email.
        const { nickname, email } = user;
        const url: string = this.generateLink.resetPassword(token);
        this.mail.send(new SendgridForgotPassword({ email, nickname, url }));
    }
};
