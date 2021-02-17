// Imports modules.
import createHttpError from "http-errors";

// Imports interfaces.
import { IEncrypt } from "../../../interfaces/encrypt.interface";
import { IPayloadJwt } from "../../../interfaces/jwt.interfaces";
import { IDatabasePasswordResetRepository } from "../../../interfaces/repositories.interfaces";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtPasswordToken } from "../../../helpers/jsonwebtokens/strategies/JwtPasswordToken";

export class CheckPasswordResetToken {
    private jwt: JsonWebToken;

    constructor(
        private repository: IDatabasePasswordResetRepository,
        private encrypt: IEncrypt
    ) {
        this.jwt = new JsonWebToken();
    }

    async verify(token: string): Promise<IPayloadJwt> {
        // Verify token
        const payload = this.jwt.verify(token, new JwtPasswordToken);

        // Consult in the database.
        const data = await this.repository.getByEmail(payload.email);

        if (!data) throw createHttpError(401, "Este token ya ha sido utilizado.", {
            name: "PasswordResetError"
        });


        // Verify tokens.
        const result = await this.encrypt.compare(token, data.token);
        if (!result) throw createHttpError(401, "El token proporcionado no coincide.", {
            name: "IncorrectToken"
        });

        // Remove token.
        await this.repository.delete(payload._id);

        return payload;
    }
};
