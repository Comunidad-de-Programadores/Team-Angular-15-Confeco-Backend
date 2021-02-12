// Imports modules.
import createError from "http-errors";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtEmailToken } from "../../../helpers/jsonwebtokens/strategies/JwtEmailToken";

// Imports interfaces.
import { IAuth } from "../../../interfaces/auth.interfaces";
import { IPayloadJwt } from "../../../interfaces/jwt.interfaces";
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";

export class VerifyEmailToken implements IAuth<IPayloadJwt> {
    constructor(
        private repository: IDatabaseUserRepository,
        private token: string
    ) {}

    async auth(): Promise<IPayloadJwt> {
        try {
            // Verify token.
            const jwt = new JsonWebToken();
            const payload = jwt.verify(this.token, new JwtEmailToken);

            // Update email status.
            await this.repository.updateEmailStatus(payload._id, true);
            return payload;
        } catch (error) {
            const { name, message } = error;
            throw createError(403, message, { name });
        }
    }
}