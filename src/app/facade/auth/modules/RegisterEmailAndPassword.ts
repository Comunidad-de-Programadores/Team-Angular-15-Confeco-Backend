// Imports modules.
import { v4 as uuid } from "uuid";
import createError, { HttpError } from "http-errors";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";
import { IAuth, IEmailVerificacionToken, IRegisterParams } from "../../../interfaces/auth.interfaces";
import { IEncrypt } from "../../../interfaces/encrypt.interface";
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtEmailToken } from "../../../helpers/jsonwebtokens/strategies/JwtEmailToken";

export class RegisterEmailAndPassword implements IAuth<IEmailVerificacionToken | HttpError> {
    constructor(
        private repository: IDatabaseUserRepository,
        private encrypt: IEncrypt,
        private data: IRegisterParams
    ) {}

    async auth(): Promise<IEmailVerificacionToken | HttpError> {
        // Check if the user exists.
        const { email } = this.data;
        const res = await this.repository.getByEmail(email);
        
        if (res) throw createError(403, "Este email ya se encuentra en uso.", {
            name: "email-already-exist"
        });

        // Encrypt password.
        this.data.password = await this.encrypt.encrypt(this.data.password);

        // Save user to the database.
        const _id: string = uuid();
        await this.repository.create({ _id, verified_email: false, ...this.data });

        // Generate token.
        const { generate } = new JsonWebToken();
        const token = generate({ _id, email }, new JwtEmailToken());

        return { email, token };
    }
};
