// Imports modules
import { sign, verify } from "jsonwebtoken";

// Imports environments.
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IGenerateToken, IPayloadJwt, IVerifyToken } from "../interfaces/jwt.interfaces";

export class JwtPasswordToken implements IGenerateToken<IPayloadJwt>, IVerifyToken<IPayloadJwt> {
    generate(payload: IPayloadJwt): string {
        const { JWT_RESET_PASSWORD_KEY } = environments;
        return sign(payload, JWT_RESET_PASSWORD_KEY as string, { expiresIn: "30m" });
    }

    verify(token: string): IPayloadJwt {
        const { JWT_RESET_PASSWORD_KEY } = environments;
        const { _id, email }: any = verify(token, JWT_RESET_PASSWORD_KEY as string);
        return { _id, email };
    }
};
