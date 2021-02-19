// Imports modules
import { sign, verify } from "jsonwebtoken";

// Imports environments.
import { environments } from "../../../config/environments";
import { User } from "../../../models/User";

// Imports interfaces.
import { IGenerateToken, IVerifyToken } from "../interfaces/jwt.interfaces";

export class JwtPasswordToken implements IGenerateToken<User>, IVerifyToken<User> {
    generate(payload: User): string {
        const { JWT_RESET_PASSWORD_KEY } = environments;
        return sign(payload, JWT_RESET_PASSWORD_KEY as string, { expiresIn: "30m" });
    }

    verify(token: string) {
        const { JWT_RESET_PASSWORD_KEY } = environments;
        const data: any = verify(token, JWT_RESET_PASSWORD_KEY as string);
        return data;
    }
};
