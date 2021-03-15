// Imports modules.
import createHttpError from "http-errors";

// Imports interfaces.
import { IAuth, IPasswordReset } from "../interfaces/auth.interfaces";
import { IEncrypt } from "../../../helpers/encryptors/interfaces/encrypt.interface";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";
import { IPayloadJwt } from "../../../helpers/jsonwebtokens/interfaces/jwt.interfaces";

// Imports models.
import { User } from "../../../models/User";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { GetUser } from "../../../repositories/user/read.user";
import { UpdateUser } from "../../../repositories/user/write.user";

export class PasswordReset implements IAuth<void> {
    private database: DatabaseRepository<string, UserDatabase>;
    private jwt: JwtFacade;

    constructor(private encrypt: IEncrypt, private data: IPasswordReset) {
        this.database = new DatabaseRepository;
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<void> {
        // Verify token.
        const payload: IPayloadJwt = this.jwt.checkPasswordResetToken(this.data.token);

        // Check if the token exists.
        const user: UserDatabase | null = await this.database.get(payload._id, new GetUser);
        if (!user?.passwordResetToken) throw createHttpError(403, "El token ya ha sido utilizado.");

        // Generate new password.
        const newPassword: string = await this.encrypt.encrypt(this.data.password);

        // Update user.
        const userUpdated: User = new User(user);
        await this.database.update(
            payload._id,
            { ...userUpdated, passwordResetToken: undefined, password: newPassword },
            new UpdateUser
        );
    }
}