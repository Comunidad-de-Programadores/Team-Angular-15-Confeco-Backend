// Imports modules.
import { sign, verify } from "jsonwebtoken";
import { environments } from "../../../config/environments";

// Imports models.
import { User } from "../../../models/User";

// Imports interfaces.
import { IGenerateToken, IVerifyToken } from "../interfaces/jwt.interfaces";

export class JwtChangeEmail implements IGenerateToken<User>, IVerifyToken<User> {
    generate(payload: User): string {
        const { JWT_CHANGE_EMAIL_KEY } = environments;
        return sign(payload, JWT_CHANGE_EMAIL_KEY as string, { expiresIn: "15m" });
    }

    verify(token: string): User {
        const { JWT_CHANGE_EMAIL_KEY } = environments;
        const data: any = verify(token, JWT_CHANGE_EMAIL_KEY as string);
        return data;
    }
}