// Imports modules.
import { sign, verify } from "jsonwebtoken";

// Import environment.
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IGenerateToken, IVerifyToken, PayloadJWT } from "../interfaces/jwt.interfaces";

// Imports models.
import { User } from "../../../models/User";

export class JwtChangeEmail implements IGenerateToken<User>, IVerifyToken<User> {
    generate(payload: PayloadJWT<User>): string {
        const { JWT_CHANGE_EMAIL_KEY } = environments;

        if (payload.expiresIn) return sign(payload.data, JWT_CHANGE_EMAIL_KEY as string, {
            expiresIn: payload.expiresIn
        });

        return sign(payload.data, JWT_CHANGE_EMAIL_KEY as string, { expiresIn: "15m" });
    }

    verify(token: string): User {
        const { JWT_CHANGE_EMAIL_KEY } = environments;
        return verify(token, JWT_CHANGE_EMAIL_KEY as string) as any;
    }
}