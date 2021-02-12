// Imports modules.
import createError, { HttpError } from "http-errors";
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtEmailToken } from "../../../helpers/jsonwebtokens/strategies/JwtEmailToken";

// Imports interfaces.
import { IAuth } from "../../../interfaces/auth.interfaces";

export class VerifyEmailToken implements IAuth<any> {
    constructor(
        private token: string | undefined
    ) {}

    async auth(): Promise<any> {
        const error = createError(403, "El token es invalido.", {
            name: "invalid-token"
        });
        if (!this.token) throw error;

        // Verify token.
        const jwt = new JsonWebToken();
        const payload = jwt.verify(this.token, new JwtEmailToken);
        if (!payload) throw error;

        return payload
    }
}