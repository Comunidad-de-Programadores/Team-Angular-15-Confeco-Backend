// Imports modules.
import createHttpError from "http-errors";

// Imports interfaces.
import { IAuth, IPasswordReset } from "../../interfaces/auth.interfaces";
import { IEncrypt } from "../../../../helpers/encryptors/interfaces/encrypt.interface";
import { UserDatabase } from "../../../../repositories/interfaces/entities.interfaces";
import { IPayloadJwt } from "../../../../helpers/jsonwebtokens/interfaces/jwt.interfaces";

// Imports jsonwebtoken.
import { JsonWebToken } from "../../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtPasswordToken } from "../../../../helpers/jsonwebtokens/strategies/JwtPasswordToken";

// Imports repositories.
import { DatabaseRepository } from "../../../../repositories/DatabaseRepository";

// Import repository actions.
import { GetUser } from "../../../../repositories/user/read.user";
import { UpdatePassword, UpdatePasswordResetToken } from "../../../../repositories/user/write.user";

export class PasswordReset implements IAuth<void> {
    private database: DatabaseRepository<UserDatabase>;
    private jsonwebtoken: JsonWebToken;

    constructor(private encrypt: IEncrypt, private data: IPasswordReset) {
        this.database = new DatabaseRepository;
        this.jsonwebtoken = new JsonWebToken;
    }

    async auth(): Promise<void> {
        // Verify token.
        const payload: IPayloadJwt = this.jsonwebtoken.verify(this.data.token, new JwtPasswordToken);

        // Check if the token exists.
        const user: UserDatabase | null = await this.database.get(new GetUser(payload._id));
        if (!user?.passwordResetToken) throw createHttpError(403, "El token ya ha sido utilizado.");

        // Generate new password.
        const newPassword: string = await this.encrypt.encrypt(this.data.password);

        // Update user.
        Promise.all([
            this.database.update(new UpdatePassword({
                key: payload._id,
                value: newPassword
            })),
            this.database.update(new UpdatePasswordResetToken({
                key: payload._id,
                value: undefined
            }))
        ]);
    }
}