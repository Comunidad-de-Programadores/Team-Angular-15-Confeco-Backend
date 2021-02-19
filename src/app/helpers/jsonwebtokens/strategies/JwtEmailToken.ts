// Imports modules
import { sign, verify } from "jsonwebtoken";
import { environments } from "../../../config/environments";
import { User } from "../../../models/User";

// Imports interfaces.
import { IGenerateToken, IVerifyToken } from "../interfaces/jwt.interfaces";

export class JwtEmailToken implements IGenerateToken<User>, IVerifyToken<User> {
    generate(payload: User): string {
        const { JWT_EMAIL_VERIFICACION } = environments;
        return sign(payload, JWT_EMAIL_VERIFICACION as string);
    }

    verify(token: string) {
        const { JWT_EMAIL_VERIFICACION } = environments;
        const data: any = verify(token, JWT_EMAIL_VERIFICACION as string);
        return data;
    }
}