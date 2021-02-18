// Implements interfaces.
import { IAuth } from "../../../interfaces/auth.interfaces";
import { IDatabasePasswordResetRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports jsonwebtoken.
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtPasswordToken } from "../../../helpers/jsonwebtokens/strategies/JwtPasswordToken";
import createHttpError from "http-errors";

export class VerifyPasswordResetToken implements IAuth<void> {
    private jwt: JsonWebToken;

    constructor(
        private repository: IDatabasePasswordResetRepository,
        private token: string
    ) {
        this.jwt = new JsonWebToken();
    }

    async auth(): Promise<void> {
        // Verify token.
        const payload = this.jwt.verify(this.token, new JwtPasswordToken);

        // Get data
        const data = await this.repository.getByEmail(payload.email);

        if (!data) throw createHttpError(403, "El token ya ha sido utilizado.", {
            name: "UsedTokenError"
        });
    }
};
