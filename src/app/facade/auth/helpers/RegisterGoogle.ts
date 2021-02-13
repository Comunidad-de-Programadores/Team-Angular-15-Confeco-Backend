// Imports modules.
import { TokenPayload } from "google-auth-library";
import createHttpError from "http-errors";
import { v4 as uuid } from "uuid";
import uniqid from "uniqid";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";
import { IAuth, IAuthRes } from "../../../interfaces/auth.interfaces";
import { IEncrypt } from "../../../interfaces/encrypt.interface";
import { IPayloadJwt } from "../../../interfaces/jwt.interfaces";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../../../helpers/jsonwebtokens/strategies/AccessToken";
import { JwtRefreshToken } from "../../../helpers/jsonwebtokens/strategies/RefreshToken";

export class RegisterGoogle implements IAuth<IAuthRes> {
    private jwt: JsonWebToken;

    constructor(
        private repository: IDatabaseUserRepository,
        private encrypt: IEncrypt,
        private data: TokenPayload
    ) {
        this.jwt = new JsonWebToken();
    }

    async auth(): Promise<IAuthRes> {
        // Save user.
        const nickname = `${ this.data.given_name }${ Math.round(Math.random() * (1000 - 100)) }`
        const email = this.data.email || `${ uniqid() }@gmail.com`;
        const password = await this.encrypt.encrypt(uuid());
        const provider = "google";
        await this.repository.create({ _id: uuid(), email, nickname, password, provider });

        const user = await this.repository.getByEmail(email);
        if (!user) throw createHttpError(400, "Sucedio un error durante la operacion", {
            name: "ErrorRegister"
        });

        // Generate tokens.
        const payload: IPayloadJwt = { _id: user._id, email: user.email };
        const access_token: string = this.jwt.generate(payload, new JwtAccessToken);
        const refresh_token: string = this.jwt.generate(payload, new JwtRefreshToken);

        delete user.password;
        return { user, tokens: { access_token, refresh_token } };
    }
};
