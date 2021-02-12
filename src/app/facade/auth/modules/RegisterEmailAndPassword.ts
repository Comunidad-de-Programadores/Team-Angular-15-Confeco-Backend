// Imports modules.
import { v4 as uuid } from "uuid";
import createError from "http-errors";

// Imports environments.
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";
import { IAuth, IEmailVerificacionToken, IRegisterParams } from "../../../interfaces/auth.interfaces";
import { IEncrypt } from "../../../interfaces/encrypt.interface";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtEmailToken } from "../../../helpers/jsonwebtokens/strategies/JwtEmailToken";

export class RegisterEmailAndPassword implements IAuth<IEmailVerificacionToken> {
    constructor(
        private repository: IDatabaseUserRepository,
        private encrypt: IEncrypt,
        private data: IRegisterParams
    ) {}

    async auth(): Promise<IEmailVerificacionToken> {
        // Check if the user exists.
        const { email, nickname } = this.data;
        const res = await this.repository.getByEmail(email);
        
        if (res) throw createError(403, "Este email ya se encuentra en uso.", {
            name: "EmailAlreadyExist"
        });

        // Encrypt password.
        this.data.password = await this.encrypt.encrypt(this.data.password);

        // Save user to the database.
        const _id: string = uuid();
        await this.repository.create({ _id, verified_email: false, ...this.data });

        // Generate token.
        const { generate } = new JsonWebToken();
        const token = generate({ _id, email }, new JwtEmailToken());

        // Generate url.
        const url = `${ environments.URL }/api/auth/verify_email/${ token }`;
        return { email, nickname, url  };
    }
};
