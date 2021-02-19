// Imports modules.
import { sign, verify } from "jsonwebtoken";

// Imports environments
import { environments } from "../../../config/environments";
import { User } from "../../../models/User";

// Imports interfaces.
import { IGenerateToken, IVerifyToken } from "../interfaces/jwt.interfaces";

export class JwtAccessToken implements IGenerateToken<User>, IVerifyToken<User> {
    generate(payload: User): string {
        const { JWT_ACCESS_TOKEN_KEY } = environments;
        return sign(payload, JWT_ACCESS_TOKEN_KEY as string, { expiresIn: "10h" });
    }

    verify(token: string) {
        const { JWT_ACCESS_TOKEN_KEY } = environments;
        const data: any = verify(token, JWT_ACCESS_TOKEN_KEY as string);
        return data;
    }
};
