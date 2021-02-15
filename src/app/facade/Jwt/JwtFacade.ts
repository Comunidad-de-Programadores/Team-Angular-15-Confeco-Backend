// Imports interfaces.
import { IPayloadJwt } from "../../interfaces/jwt.interfaces";

// Import environments
import { environments } from "../../config/environments";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../../helpers/jsonwebtokens/strategies/AccessToken";
import { JwtRefreshToken } from "../../helpers/jsonwebtokens/strategies/RefreshToken";
import { JwtEmailToken } from "../../helpers/jsonwebtokens/strategies/JwtEmailToken";

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

    generateEmailConfirmationLink(payload: IPayloadJwt): string {
        const token: string = this.jwt.generate(payload, new JwtEmailToken);
        return `${ environments.URL }/api/auth/confirm_email/${ token }`;
    }
};
