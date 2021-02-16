// Imports modules.
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IEncrypt } from "../../../interfaces/encrypt.interface";
import { IDatabasePasswordResetRepository } from "../../../interfaces/repositories.interfaces";

// Imports jsonwebtokens
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtPasswordToken } from "../../../helpers/jsonwebtokens/strategies/JwtPasswordToken";

export class GeneratePasswordResetToken {
    private jwt: JsonWebToken;

    constructor(
        private repository: IDatabasePasswordResetRepository,
        private encrypt: IEncrypt
    ) {
        this.jwt = new JsonWebToken();
    }

    async generate(email: string): Promise<string> {
        // Verify existence.
        const data = await this.repository.getByEmail(email);

        // Generate token.
        const _id = data?._id || uuid();
        const token: string = this.jwt.generate({ _id, email }, new JwtPasswordToken);

        // Encrypt token.
        const newToken: string = await this.encrypt.encrypt(token);

        if (data) {
            // Change token.
            const values = Object.defineProperties(data, {
                token: { value: newToken }
            });
            await this.repository.update(data._id, values);
            return token;
        }

        // Save data in the database.
        await this.repository.create({ _id, email, token: newToken });
        return token;
    }
};
