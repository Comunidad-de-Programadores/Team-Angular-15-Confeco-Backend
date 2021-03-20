// Imports modules
import { sign, verify } from "jsonwebtoken";

// Imports environments.
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IGenerateToken, IVerifyToken, PayloadJWT } from "../interfaces/jwt.interfaces";

// Import model
import { User } from "../../../models/User";

export class JwtPasswordToken implements IGenerateToken<User>, IVerifyToken<User> {
    generate(payload: PayloadJWT<User>): string {
        const { JWT_RESET_PASSWORD_KEY } = environments;

        if (payload.expiresIn) return sign(payload.data, JWT_RESET_PASSWORD_KEY as string, {
            expiresIn: payload.expiresIn
        });

        return sign(payload.data, JWT_RESET_PASSWORD_KEY as string, { expiresIn: "30m" });
    }

    verify(token: string) {
        const { JWT_RESET_PASSWORD_KEY } = environments;
        const data: any = verify(token, JWT_RESET_PASSWORD_KEY as string);
        return data;
    }
};
