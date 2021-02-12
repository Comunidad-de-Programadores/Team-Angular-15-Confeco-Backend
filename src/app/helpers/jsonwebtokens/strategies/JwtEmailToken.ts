// Imports modules
import { sign, verify } from "jsonwebtoken";
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IGenerateToken, IPayloadJwt, IVerifyToken } from "../../../interfaces/jwt.interfaces";

export class JwtEmailToken implements IGenerateToken<IPayloadJwt>, IVerifyToken<IPayloadJwt> {
    generate(payload: IPayloadJwt): string {
        const { JWT_EMAIL_VERIFICACION } = environments;
        return sign(payload, JWT_EMAIL_VERIFICACION as string, { expiresIn: "5m" });
    }

    verify(token: string): IPayloadJwt {
        const { JWT_EMAIL_VERIFICACION } = environments;
        const { email, _id }: any = verify(token, JWT_EMAIL_VERIFICACION as string);
        return { email, _id };
    }
}