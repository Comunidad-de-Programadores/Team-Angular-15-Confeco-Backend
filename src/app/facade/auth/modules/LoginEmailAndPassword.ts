// Imports modules.
import createHttpError, { HttpError } from "http-errors";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";
import { IAuth, IAuthRes, ICredentials } from "../../../interfaces/auth.interfaces";
import { IEncrypt } from "../../../interfaces/encrypt.interface";
import { IPayloadJwt } from "../../../interfaces/jwt.interfaces";
import { User } from "../../../models/User";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../../../helpers/jsonwebtokens/strategies/AccessToken";
import { JwtRefreshToken } from "../../../helpers/jsonwebtokens/strategies/RefreshToken";

export class LoginEmailAndPassword implements IAuth<IAuthRes> {
    private jwt: JsonWebToken;

    constructor(
        private repository: IDatabaseUserRepository,
        private encrypt: IEncrypt,
        private credentials: ICredentials
    ) {
        this.jwt = new JsonWebToken();
    }

    async auth(): Promise<IAuthRes> {
        // Verify user existence.
        const { email, password } = this.credentials;
        const user: User | null = await this.repository.getByEmail(email);
        const credentialsIncorrect: HttpError = createHttpError(403, "Las credenciales son incorrectas.", {
            name: "CredentialsIncorrect"
        });
        if (!user)  throw credentialsIncorrect;

        // Compare password
        const result = await this.encrypt.compare(password, user.password as string);
        if (!result) throw credentialsIncorrect;

        // Generate tokens.
        const payload: IPayloadJwt = { _id: user._id, email: user.email };
        const access_token: string = this.jwt.generate(payload, new JwtAccessToken());
        const refresh_token: string = this.jwt.generate(payload, new JwtRefreshToken());

        delete user.password;
        return { user, tokens: { access_token, refresh_token } };
    }
};
