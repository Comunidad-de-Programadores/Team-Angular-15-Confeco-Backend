// Imports modules.
import createHttpError from "http-errors";

// Implements interfaces.
import { IAuth } from "../../interfaces/auth.interfaces";
import { UserDatabase } from "../../../../repositories/interfaces/entities.interfaces";

// Imports jsonwebtoken.
import { JsonWebToken } from "../../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtPasswordToken } from "../../../../helpers/jsonwebtokens/strategies/JwtPasswordToken";

// Imports repositories.
import { DatabaseRepository } from "../../../../repositories/DatabaseRepository";
import { GetUserByEmail } from "../../../../repositories/user/read.user";

export class VerifyPasswordResetToken implements IAuth<void> {
    private database: DatabaseRepository<string, UserDatabase>;
    private jwt: JsonWebToken;

    constructor(private token: string) {
        this.database = new DatabaseRepository;
        this.jwt = new JsonWebToken();
    }

    async auth(): Promise<void> {
        // Verify token.
        const payload = this.jwt.verify(this.token, new JwtPasswordToken);

        // Get data
        const data: UserDatabase | null = await this.database.get(payload.email, new GetUserByEmail);

        if (!data?.passwordResetToken) throw createHttpError(403, "El token ya ha sido utilizado.", {
            name: "UsedTokenError"
        });
    }
};
