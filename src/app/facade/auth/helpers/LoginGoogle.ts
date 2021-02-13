// Imports interfaces.
import { IAuth, IAuthRes } from "../../../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";
import { IPayloadJwt } from "../../../interfaces/jwt.interfaces";
import { User } from "../../../models/User";

// Imports jsonwebtokens
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../../../helpers/jsonwebtokens/strategies/AccessToken";
import { JwtRefreshToken } from "../../../helpers/jsonwebtokens/strategies/RefreshToken";

export class LoginGoogle implements IAuth<IAuthRes> {
    private jwt: JsonWebToken;

    constructor(
        private repository: IDatabaseUserRepository,
        private user: User
    ) {
        this.jwt = new JsonWebToken();
    }

    async auth(): Promise<IAuthRes> {
        const user = Object.defineProperties(this.user, {
            provider: { value: "google" },
            password: { value: "" }
        });

        // Update fields user.
        if (user.provider !== "google") await this.repository.update(user._id, user);

        // Generate tokens.
        const payload: IPayloadJwt = { ...user };
        const access_token: string = this.jwt.generate(payload, new JwtAccessToken);
        const refresh_token: string = this.jwt.generate(payload, new JwtRefreshToken);

        delete user.password;
        return { user, tokens: { access_token, refresh_token } };
    }
};
