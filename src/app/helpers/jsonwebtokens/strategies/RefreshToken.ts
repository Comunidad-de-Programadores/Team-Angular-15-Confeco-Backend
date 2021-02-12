// Imports modules.
import { sign, verify } from "jsonwebtoken";
import { environments } from "../../../config/environments";

// Imports interfaces
import { IGenerateToken, IPayloadJwt, IVerifyToken } from "../../../interfaces/jwt.interfaces";

export class JwtRefreshToken implements IGenerateToken<IPayloadJwt>, IVerifyToken<IPayloadJwt> {
    generate(data: IPayloadJwt): string {
        const { JWT_REFRESH_TOKEN_KEY } = environments;
        return sign(data, JWT_REFRESH_TOKEN_KEY as string, { expiresIn: "10m" });
    }

    verify(token: string): IPayloadJwt {
        const { JWT_REFRESH_TOKEN_KEY } = environments;
        const { email, _id }: any = verify(token, JWT_REFRESH_TOKEN_KEY as string);
        return { email, _id };
    }
}
