// Imports models.
import { User } from "../../models/User";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../../helpers/jsonwebtokens/strategies/AccessToken";
import { JwtRefreshToken } from "../../helpers/jsonwebtokens/strategies/RefreshToken";
import { JwtEmailToken } from "../../helpers/jsonwebtokens/strategies/JwtEmailToken";
import { JwtPasswordToken } from "../../helpers/jsonwebtokens/strategies/JwtPasswordToken";
import { JwtChangeEmail } from "../../helpers/jsonwebtokens/strategies/JwtChangeEmail";

export class JwtFacade {
    private jwt: JsonWebToken;
    
    constructor() {
        this.jwt = new JsonWebToken();
    }

    generateTokens(payload: User) {
        const access_token: string = this.jwt.generate(payload, new JwtAccessToken);
        const refresh_token: string = this.jwt.generate(payload, new JwtRefreshToken);
        return { access_token, refresh_token };
    }

    generateEmailConfirmationLink(payload: User): string {
        return this.jwt.generate(payload, new JwtEmailToken);
    }

    checkEmailVerificationLink(token: string) {
        return this.jwt.verify(token, new JwtEmailToken);
    }

    generatePasswordResetToken(payload: User) {
        return this.jwt.generate(payload, new JwtPasswordToken);
    }

    checkPasswordResetToken(token: string): User {
        return this.jwt.verify(token, new JwtPasswordToken);
    }

    generateEmailChangeToken(payload: User): string {
        return this.jwt.generate(payload, new JwtChangeEmail);
    }

    checkEmailResetToken(token: string): User {
        return this.jwt.verify(token, new JwtChangeEmail);
    }
};
