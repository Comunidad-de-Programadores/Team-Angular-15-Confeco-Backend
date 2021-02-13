// Imports modules.
import createError from "http-errors";
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";
import { IAuth, IAuthRes, IRegisterParams } from "../../../interfaces/auth.interfaces";
import { IEncrypt } from "../../../interfaces/encrypt.interface";
import { User } from "../../../models/User";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../../../helpers/jsonwebtokens/strategies/AccessToken";
import { JwtRefreshToken } from "../../../helpers/jsonwebtokens/strategies/RefreshToken";

export class RegisterEmailAndPassword implements IAuth<IAuthRes> {
    constructor(
        private repository: IDatabaseUserRepository,
        private encrypt: IEncrypt,
        private data: IRegisterParams
    ) {}

    async auth(): Promise<IAuthRes> {
        // Check if the user exists.
        let params: IRegisterParams = Object.assign({}, this.data);
        const result: User | null = await this.repository.getByEmail(params.email);
        
        if (result) throw createError(403, "Este email ya se encuentra en uso.", {
            name: "EmailAlreadyExist"
        });

        // Encrypt password.
        params.password = await this.encrypt.encrypt(params.password);

        // Save user to the database.
        await this.repository.create({ _id: uuid(), ...params });

        // Get fields user.
        const user = await this.repository.getByEmail(params.email);
        if (!user) throw createError(400, "Sucedio un error en la autenticacion.", {
            name: "AuthenticationError"
        });

        // Generate tokens.
        const { generate } = new JsonWebToken();
        const access_token: string = generate(
            { _id: user._id, email: params.email },
            new JwtAccessToken()
        );
        const refresh_token: string = generate(
            { _id: user._id, email: params.email },
            new JwtRefreshToken()
        );

        delete user.password;
        return { user, tokens: { access_token, refresh_token } };
    }
};
