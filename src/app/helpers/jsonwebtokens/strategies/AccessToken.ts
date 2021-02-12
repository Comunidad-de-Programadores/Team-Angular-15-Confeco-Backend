// Imports modules.
import { sign, verify } from "jsonwebtoken";

// Imports environments
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IGenerateToken, IPayloadJwt, IVerifyToken } from "../../../interfaces/jwt.interfaces";

export class JwtAccessToken implements IGenerateToken<IPayloadJwt>, IVerifyToken<IPayloadJwt> {
    generate(payload: IPayloadJwt): string {
        const { JWT_ACCESS_TOKEN_KEY } = environments;
        return sign(payload, JWT_ACCESS_TOKEN_KEY as string, { expiresIn: "5m" });
    }

    verify(token: string) {
        const { JWT_ACCESS_TOKEN_KEY } = environments;

        const { email, _id }: any = verify(token, JWT_ACCESS_TOKEN_KEY as string);
        return { email, _id };
    }
};
