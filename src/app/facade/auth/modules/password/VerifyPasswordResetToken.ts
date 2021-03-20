// Imports modules.
import createHttpError from "http-errors";

// Implements interfaces.
import { IAuth } from "../../interfaces/auth.interfaces";
import { UserDatabase } from "../../../../repositories/interfaces/entities.interfaces";

// Import model.
import { User } from "../../../../models/User";

// Imports jsonwebtoken.
import { JsonWebToken } from "../../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtPasswordToken } from "../../../../helpers/jsonwebtokens/strategies/JwtPasswordToken";

// Imports repositories.
import { DatabaseRepository } from "../../../../repositories/DatabaseRepository";
import { GetUserByEmail } from "../../../../repositories/user/read.user";

export class VerifyPasswordResetToken implements IAuth<void> {
    private database: DatabaseRepository<UserDatabase>;
    private jwt: JsonWebToken;

    constructor(private token: string) {
        this.database = new DatabaseRepository;
        this.jwt = new JsonWebToken();
    }

    async auth(): Promise<void> {
        // Verify token.
        const payload: User = this.jwt.verify(this.token, new JwtPasswordToken);

        // Get data
        const data: UserDatabase | null = await this.database.get(new GetUserByEmail(payload.email));

        if (!data?.passwordResetToken) throw createHttpError(403, "El token ya ha sido utilizado.", {
            name: "UsedTokenError"
        });
    }
};
