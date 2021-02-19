// Imports modules.
import { sign, verify } from "jsonwebtoken";
import { environments } from "../../../config/environments";
import { User } from "../../../models/User";

// Imports interfaces
import { IGenerateToken, IVerifyToken } from "../interfaces/jwt.interfaces";

export class JwtRefreshToken implements IGenerateToken<User>, IVerifyToken<User> {
    generate(data: User): string {
        const { JWT_REFRESH_TOKEN_KEY } = environments;
        return sign(data, JWT_REFRESH_TOKEN_KEY as string, { expiresIn: "1d" });
    }

    verify(token: string) {
        const { JWT_REFRESH_TOKEN_KEY } = environments;
        const data: any = verify(token, JWT_REFRESH_TOKEN_KEY as string);
        return data;
    }
}
