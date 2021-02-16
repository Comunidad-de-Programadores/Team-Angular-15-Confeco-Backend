// Imports interfaces.
import { IPayloadJwt } from "../../interfaces/jwt.interfaces";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../../helpers/jsonwebtokens/strategies/AccessToken";
import { JwtRefreshToken } from "../../helpers/jsonwebtokens/strategies/RefreshToken";
import { JwtEmailToken } from "../../helpers/jsonwebtokens/strategies/JwtEmailToken";
import { JwtPasswordToken } from "../../helpers/jsonwebtokens/strategies/JwtPasswordToken";

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
        return this.jwt.generate(payload, new JwtEmailToken);
    }

    checkEmailVerificationLink(token: string) {
        return this.jwt.verify(token, new JwtEmailToken);
    }

    generatePasswordResetToken(payload: IPayloadJwt) {
        return this.jwt.generate(payload, new JwtPasswordToken);
    }
};
