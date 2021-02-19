// Imports modules.
import createHttpError from "http-errors";

// Implements interfaces.
import { IAuth } from "../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports jsonwebtoken.
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtPasswordToken } from "../../../helpers/jsonwebtokens/strategies/JwtPasswordToken";

export class VerifyPasswordResetToken implements IAuth<void> {
    private jwt: JsonWebToken;

    constructor(
        private repository: IDatabaseUserRepository,
        private token: string
    ) {
        this.jwt = new JsonWebToken();
    }

    async auth(): Promise<void> {
        // Verify token.
        const payload = this.jwt.verify(this.token, new JwtPasswordToken);

        // Get data
        const data = await this.repository.getByEmail(payload.email);

        if (!data?.passwordResetToken) throw createHttpError(403, "El token ya ha sido utilizado.", {
            name: "UsedTokenError"
        });
    }
};
