// Imports modules.
import { sign, verify } from "jsonwebtoken";

// Import environments
import { environments } from "../../../config/environments";

// Imports interfaces
import { IGenerateToken, IVerifyToken, PayloadJWT } from "../interfaces/jwt.interfaces";

// Import model.
import { User } from "../../../models/User";

export class JwtRefreshToken implements IGenerateToken<User>, IVerifyToken<User> {
    generate(payload: PayloadJWT<User>): string {
        const { JWT_REFRESH_TOKEN_KEY } = environments;
        
        if (payload.expiresIn) return sign(payload.data, JWT_REFRESH_TOKEN_KEY as string, {
            expiresIn: payload.expiresIn
        });
        
        return sign(payload.data, JWT_REFRESH_TOKEN_KEY as string);
    }

    verify(token: string) {
        const { JWT_REFRESH_TOKEN_KEY } = environments;
        const data: any = verify(token, JWT_REFRESH_TOKEN_KEY as string);
        return data;
    }
}
