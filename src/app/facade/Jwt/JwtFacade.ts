// Imports interfaces.
import { IPayloadJwt } from "../../interfaces/jwt.interfaces";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../../helpers/jsonwebtokens/strategies/AccessToken";
import { JwtRefreshToken } from "../../helpers/jsonwebtokens/strategies/RefreshToken";

export class JwtFacade {
    private jwt: JsonWebToken;
    
    constructor() {
        this.jwt = new JsonWebToken();
    }

    generateTokens(payload: IPayloadJwt) {
        const access_token: string = this.jwt.generate(payload, new JwtAccessToken);
        const refresh_token: string = this.jwt.generate(payload, new JwtRefreshToken);
        return { access_token, refresh_token };
    }
};
