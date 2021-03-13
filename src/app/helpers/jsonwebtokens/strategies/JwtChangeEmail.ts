// Imports modules.
import { sign, verify } from "jsonwebtoken";

// Imports models.
import { User } from "../../../models/User";

// Imports interfaces.
import { IGenerateToken, IVerifyToken } from "../interfaces/jwt.interfaces";

export class JwtChangeEmail implements IGenerateToken<User>, IVerifyToken<User> {
    generate(payload: User): string {
        throw new Error("Method not implemented.");
    }

    verify(token: string): User {
        throw new Error("Method not implemented.");
    }
}