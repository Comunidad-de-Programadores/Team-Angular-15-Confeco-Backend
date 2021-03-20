// Imports modules
import { sign, verify } from "jsonwebtoken";

// Import environments.
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IGenerateToken, IVerifyToken, PayloadJWT } from "../interfaces/jwt.interfaces";

// Import model.
import { User } from "../../../models/User";

export class JwtEmailToken implements IGenerateToken<User>, IVerifyToken<User> {
    generate(payload: PayloadJWT<User>): string {
        const { JWT_EMAIL_VERIFICACION } = environments;
        
        if (payload.expiresIn) return sign(payload.data, JWT_EMAIL_VERIFICACION as string, {
            expiresIn: payload.expiresIn
        });

        return sign(payload.data, JWT_EMAIL_VERIFICACION as string, {
            expiresIn: "1h"
        });
    }

    verify(token: string) {
        const { JWT_EMAIL_VERIFICACION } = environments;
        const data: any = verify(token, JWT_EMAIL_VERIFICACION as string);
        return data;
    }
}